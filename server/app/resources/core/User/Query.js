module.exports = {
  users: {
    type: new GraphQLList(User),
    resolve: () => {} // TODO
  }
}