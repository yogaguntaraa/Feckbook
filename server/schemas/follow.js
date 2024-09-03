const typeDefs = `#graphql

  type Follow {
    _id: String
    followingId: String
    followerId: String
    createdAt: String
    updatedAt: String
  }

  
  type Mutation {
    addFollow(followingId: String): String
  }
`;

module.exports = typeDefs