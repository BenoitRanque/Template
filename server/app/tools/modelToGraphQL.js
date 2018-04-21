
const { Model } = require('objection')
const {
  GraphQLObjectType, GraphQLEnumType, GraphQLBoolean, GraphQLString, GraphQLFloat, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLInputObjectType
} = require('graphql')

const cache = {}

function cached(name, init) {
  if (!cache[name]) cache[name] = init()
  return cache[name]
}

function modelToGraphQLType (model) {
  let config = { inputType: false }
  let name = `${model.name}`
  let initFunc = () => new GraphQLObjectType({
    name,
    description: `Filter type for model ${model.name}`,
    fields: () => ({
      ...schemaToGraphQLFields(model.jsonSchema.properties, model.jsonSchema.required, model.resolvers, config),
      ...relationsToGraphQLFields(model.relationMappings, model => model.GraphQLType, config)
    })
  })
  return cached(name, initFunc)
}

function modelToGraphQLFilterType (model) {
  let config = { inputType: true }
  let name = `${model.name}_filter`
  let initFunc = () => new GraphQLInputObjectType({
    name,
    description: `Filter type for model ${model.name}`,
    fields: () => schemaToGraphQLFields(model.filters, model.jsonSchema.required, null, config),
  })
  return cached(name, initFunc)
}

function modelToGraphQLInputType (model) {
  let config = { inputType: true }
  let name = `${model.name}_input`
  let initFunc = () => new GraphQLInputObjectType({
    name,
    description: `Filter type for model ${model.name}`,
    fields: () => ({
      ...schemaToGraphQLFields(model.jsonSchema.properties, model.jsonSchema.required, null, config),
      ...relationsToGraphQLFields(model.relationMappings, model => model.GraphQLInputType, config)
    })
  })
  return cached(name, initFunc)
}

function relationsToGraphQLFields(relations, getModelType, config) {
  if (!relations) return {}

  let relationObject  = Object.keys(relations).reduce((result, relationName) => {
    let relation = relations[relationName]
    let model = relation.modelClass
    let field = {
      type: getModelType(model),
      description: relation.description
    }

    if (!config.inputType) {
      if (model.filters) {
        field.args = {
          filter: {
            description: `Filter for ${model.name}`,
            type: model.GraphQLFilterType
          }
        }
      }
    }

    if (relation.relation === Model.HasManyRelation || relation.relation === Model.ManyToManyRelation) field.type = new GraphQLList(field.type)

    result[relationName] = field
    return result
  }, {})
  // console.log(relationObject)
  return relationObject
}

function schemaToGraphQLFields (schema, requiredFields, resolvers, config) {
  return Object.keys(schema).reduce((fields, fieldName) =>  {
    let field = {
      type: toGraphQLType(schema[fieldName], fieldName, config),
      description: schema[fieldName].description
    }

    // input type wil respecte required fields
    if (config.inputType && requiredFields && requiredFields.includes(fieldName)) field.type = new GraphQLNonNull(field.type)


    if (!config.inputType && resolvers) {
      let resolver = resolvers[fieldName]
      if (resolver) field.resolve = resolver
    }

    fields[fieldName] = field
    return fields
  }, {})
}

function toGraphQLType (schema, fieldName, config) {
  if (schema.enum) return enumToGraphQLType(schema, fieldName, config)
  switch (schema.type) {
    // disabled for now. Not sure I'll use this
    // case 'object': return objectToGraphQLType(schema, fieldName, config)

    case 'array': return new GraphQLList(toGraphQLType(schema.items, fieldName, config))
    case 'string': return GraphQLString
    case 'integer': return GraphQLInt
    case 'number': return GraphQLFloat
    case 'boolean': return GraphQLBoolean;
    default: throw new Error(`Unable to convert type ${schema.type} on schema field ${fieldName} to GraphQL type`)
  }
}

function enumToGraphQLType(schema, fieldName, config) {
  let name = `${schema.name || fieldName}_enum`
  let initFunc = () => new GraphQLEnumType({
    name,
    description: schema.description,
    values: schema.items
  })
  return cached(name, initFunc)
}

function objectToGraphQLType(schema, fieldName, config) {
  let name = `${schema.name || fieldName}_object${ config.inputType ?  '_input' : '' }`
  let initFunc = () => {
    // todo: possible naming conflict here
    let typeConfig = {
      name,
      description: schema.description,
      fields: () => toGraphQLFields(schema.properties, undefined, config)
    }
    if (config.inputType) return new GraphQLInputObjectType(typeConfig)
    return new GraphQLObjectType(typeConfig)
  }
}

module.exports = {
  modelToGraphQLType,
  modelToGraphQLInputType,
  modelToGraphQLFilterType
}
