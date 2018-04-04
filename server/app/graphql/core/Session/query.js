module.exports = {
  session: {
    type: require('./schema'),
    resolver: (parent, args, context, info) => context.session
  }
}