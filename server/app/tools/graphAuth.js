const utils = require('./utils')

let graphSchema = {
  'name': {
    action: 'create:own'
  }
}
}


let input = autorizeGraph(model, input, {
role: {
  action: 'create:any',
  validate: role => role.role_id, // role must have id
  relations: {
    privileges: [{

    }]
  }
}
})



function autorizeGraph(model, input,  graphSchema) {
  if (utils.typeOf(graphSchema) !== utils.typeOf(input)) throw new Error(`Type missmatch ${input} ${graphSchema}`)

  if (utils.typeOf(graphSchema) === 'array') {
    input.forEach((item, index) => { input[index] = autorizeGraph(model, item, graphSchema[0])})
    return input
  }

  let relations = model.getRelations()
  let ownFields = {}
  let relationFields = {}

  Object.keys(input).forEach(fieldName => {
    if (graphSchema.relations && graphschema.relations.hasOwnProperty(fieldName)) {
      if (model.relationMappings !== undefined && model.relationMappings.hasOwnProperty(fieldName)) {
        relationFields[fieldName] = autorizeGraph(relations[fieldName].relatedModelClass, input[fieldName], graphSchema.relations[fieldName])
      }
      else {
        throw new Error(`Could not find propety ${fieldName} on model ${model && model.name}`)
      }
    }
    else if (model.jsonSchema && model.jsonSchema.properties && model.jsonSchema.properties.hasOwnProperty(fieldName)) {
      ownFields[fieldName] = input[fieldName]
    }
    else {
      throw new Error(`Unknown property on input ${fieldName}`)
    }
  })

  let permission = ac(session, model.resource, graphSchema.action)
  if (!permission.granted) return null
  if (graphSchema.validate && !graphSchema.validate(input)) return null
  ownFields = permission.filter(ownFields)

  return {
    ...ownFields,
    ...relationFields
  }

// SPLIT INPUT IN TWO OBJECTS USING MODEL: OWN PROPERTIES AND RELATIONS
// USE ACESS CONTROL TO VALIDATE ACCESS TO OWN PROPERTIES
// autorize and filter each prop before creation. Recursive

// note: must filter props using accessControl, but do not filter relations

}