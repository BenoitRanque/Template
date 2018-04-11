const {
  GraphQLObjectType, GraphQLEnumType, GraphQLBoolean, GraphQLString, GraphQLFloat, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLInputObjectType
} = require('graphql')

const utils = require('@tools/utils')
const { Model: { HasManyRelation, ManyToManyRelation } } = require('objection')
const Resolver = require('@tools/resolver')

function setDefaultOptions(options) {
  return utils.setDefaults(options || {}, {
    isInputType: false,
    relations: true,
    jsonSchema: true
  })
}

function validateModel (model) {
  if (!model.jsonSchema) throw new Error(`Model must have jsonSchema. Found in ${model.name}`)
}

function modelToGraphQLType (model, options) {
  validateModel(model)
  options = setDefaultOptions(options)

  let typeConfig = {
    name: `${model.name}${ options.isInputType ? 'Input' : '' }`,
    description: model.jsonSchema && model.jsonSchema.description,
    fields: () => ({
      ...jsonSchemaToGraphQLFields(model.jsonSchema, options),
      ...relationMappingsToGraphQLFields(model.relationMappings, options)
    })
  }
  if (options.isInputType) {
    return new GraphQLInputObjectType(typeConfig)
  }
  return new GraphQLObjectType(typeConfig)

}

function modelToGraphQLFields (model, options) {
  validateModel(model)
  options = setDefaultOptions(options)

  return {
    ...jsonSchemaToGraphQLFields(model.jsonSchema, options),
    ...relationMappingsToGraphQLFields(model.relationMappings, options)
  }
}

function relationMappingsToGraphQLFields(relationMappings, options) {
  const mappings = {}

  if (!relationMappings) return mappings
  
  Object.keys(relationMappings).forEach(relationName => {
    let relation = relationMappings[relationName]
    let type = options.isInputType ? relation.modelClass.getGraphQLInputType() : relation.modelClass.getGraphQLType()

    if (relation.relation === HasManyRelation || relation.relation === ManyToManyRelation) {
      type = new GraphQLList(type)
    }
    mappings[relationName] = { type }
    if (!options.isInputType) mappings[relationName].resolve = new Resolver({
      model: relation.modelClass,
      field: relationName
    })
  })

  return mappings
}

function jsonSchemaToGraphQLFields(jsonSchema, options) {
  const fields = {}

  if (jsonSchema && jsonSchema.properties) {
    Object.keys(jsonSchema.properties).forEach(propName => {
      fields[propName] = toGraphQLField(jsonSchema.properties[propName], propName, options)
    })
    if (jsonSchema.required) {
      jsonSchema.required.forEach(requiredProp => {
        if (!fields[requiredProp]) throw new Error (`Required Property ${propName} not defined in jsonSchema. Found in ${jsonSchema.name} ${jsonSchema.description}`)
        fields[requiredProp].type = new GraphQLNonNull(fields[requiredProp].type)
      })
    }
  }
  
  return fields
}

function toGraphQLField(jsonSchema, propName, options) {
  let schemas

  if (jsonSchema.anyOf || jsonSchema.oneOf) {
    schemas = (jsonSchema.anyOf || jsonSchema.oneOf).filter(schema => !isNullSchema(schema))

    if (schemas.length === 1) {
      return toGraphQLField(schemas[0], propName);
    }
    throw new Error(`multiple anyOf/oneOf schemas in json schema is not supported. schema: ${JSON.stringify(jsonSchema)}`);
  } else if (utils.typeOf(jsonSchema.type) === 'array') {
    const type = jsonSchema.type.filter(type => !isNullType(type))

    if (type.length === 1) {
      return typeToGraphQLField(type[0], jsonSchema, propName, options)
    }
    throw new Error(`multiple values in json schema \`type\` property not supported. schema: ${JSON.stringify(jsonSchema)}`);
  } else {
    return typeToGraphQLField(jsonSchema.type, jsonSchema, propName, options)
  }
}

function typeToGraphQLField(type, jsonSchema, propName, options) {
  let graphQlField;

  if (jsonSchema.enum) {
    graphQlField = enumToGraphQLField(jsonSchema, propName, options)
  } else if (type === 'object') {
    graphQlField = objectToGraphQLField(jsonSchema, propName, options)
  } else if (type === 'array') {
    graphQlField = arrayToGraphQLField(jsonSchema, propName, options)
  } else {
    graphQlField = primitiveToGraphQLField(type, options);
  }

  if (jsonSchema.description) {
    graphQlField.description = jsonSchema.description;
  }
  if (jsonSchema.name) {
    graphQlField.name = jsonSchema.name;
  }

  return graphQlField;
}

function enumToGraphQLField(jsonSchema, propName, options) {
  return {
    type: new GraphQLEnumType({
      name: `${jsonSchema.name}${options.isInputType ? 'Input' : ''}`,
      values: jsonSchema.items.reduce((values, enumValue) => {
        values[enumValue.name] = enumValue
        return values
      }, {})
    })
  }
}

function objectToGraphQLField(jsonSchema, propName, options) {

  let typeConfig = {
    name: `${jsonSchema.name || propName }${ options.isInputType ? 'Input' : '' }`,
    description: jsonSchema.description,
    fields() {
      const fields = {};

      if (jsonSchema.properties) {
        Object.keys(jsonSchema.properties).forEach(curPropName => {
          fields[curPropName] = toGraphQLField(jsonSchema.properties[curPropName], curPropName, options)
        })
        if (jsonSchema.required) {
          jsonSchema.required.forEach(requiredProp => {
            if (!fields[requiredProp]) throw new Error (`Required Property ${propName} not defined in jsonSchema. Found in ${jsonSchema.name} ${jsonSchema.description}`)
            fields[requiredProp].type = new GraphQLNonNull(fields[requiredProp].type)
          })
        }
      }

      return fields
    }
  }
  if (options.isInputType) {
    return new GraphQLInputObjectType(typeConfig)
  }
  return new GraphQLObjectType(typeConfig)
}

function arrayToGraphQLField(jsonSchema, propName, options) {
  if (utils.typeOf(jsonSchema.items) === 'array') {
    throw new Error(`multiple values in \`items\` of array type is not supported. schema: ${JSON.stringify(jsonSchema)}`);
  }

  return {
    type: new GraphQLList(toGraphQLField(jsonSchema.items, propName).type, options),
  }
}

function primitiveToGraphQLField(type, options) {
  const graphQlType = primitiveToGraphQLType(type, options);

  if (!graphQlType) {
    throw new Error(`cannot convert json schema type "${type}" into GraphQL type`);
  }

  return { type: graphQlType };
}

function primitiveToGraphQLType(type, options) {
  switch (type) {
    case 'string': return GraphQLString;
    case 'integer': return GraphQLInt;
    case 'number': return GraphQLFloat;
    case 'boolean': return GraphQLBoolean;
    default: return null;
  }
}

function isNullSchema(schema) {
  return isNullType(schema.type) || (utils.typeOf(schema.type) === 'array' && !schema.type.some(isNullType))
}

function isNullType(type) {
  return type === 'null' || type === null
}

function stripRejectedCharacters (name) {
  return name.replace(/[^_a-zA-Z0-9]/g, '_')
}

module.exports = {
  modelToGraphQLType,
  modelToGraphQLFields
}