module.exports = class resolverInfo {
  constructor (model, parent, args, context, info) {
    let { ac, session } = context
  }

  hasOwnerShip(model, data, session) {
    return model.owner(data, session.user.user_id)
  }

  eager () {
    // generate eager expression. is authorized
  }

  filter(data) {
    // deep filter of data 
  }

  graph () {
    // input graph
  }
}

class exampleModel