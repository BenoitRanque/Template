// function newLinkSubscribe (parent, args, context, info) {
//   return context.prisma.bindings.subscription.link(
//     { where: { mutation_in: ['CREATED'] } },
//     info,
//   )
// }

// const newLink = {
//   subscribe: newLinkSubscribe
// }

// function newVoteSubscribe (parent, args, context, info) {
//   return context.prisma.bindings.subscription.vote(
//     { where: { mutation_in: ['CREATED'] } },
//     info,
//   )
// }

// const newVote = {
//   subscribe: newVoteSubscribe
// }

// module.exports = {
//   newLink,
//   newVote,
// }