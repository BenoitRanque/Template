const Resolver = require('@tools/resolver')
const { GraphQLObjectType, GraphQLNonNull } = require('graphql')
const { User } = require('../models')

module.exports = {
  user: {
    type: new GraphQLObjectType({
      name: 'CoreUserMutation',
      description: 'Core User Mutations',
      fields: () => ({
        create: {
          type: User.GraphQLType,
          args: {
            input: {
              description: 'the new User',
              type: new GraphQLNonNull(User.GraphQLInputType)
            }
          },
          resolve: new Resolver({
            model: User,
            action: 'create:any',
            method: ({ model, args }) => {
              console.log(args.input)
              let user = await model.query().insert(args.input)
              console.log(user)
              return user
            }
          })
        }
      })
    }),
    resolve: () => ({})
  }
}

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
      privileges: {

      }
    }
  }
})


function autorizeGraph(model, input,  graphSchema) {

  // autorize and filter each prop before creation. Recursive

  // note: must filter props using accessControl, but do not filter relations
  
}