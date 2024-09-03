const typeDefs = `#graphql
  type User {
    _id: String
    name: String
    username: String!
    email: String!
    password: String!
    following: [Following]
    followingDetail: [FollowingDetail]
    follower: [Following]
    followerDetail: [FollowingDetail]
  }

  type Following {
    _id: String
    followingId: String
    followerId: String
    createdAt: String
    updatedAt: String
  }
  type FollowingDetail {
    _id: String
    name: String
    username: String
    email: String
  }
  
  type Query {
    users: [User]
    getUserById(_id: String): User
    getAllUser: [User]
    getUserByUsername(username: String): User
    getUserByEmail(email: String): User
  }

  type Token {
    accessToken: String
    userId: String
    username: String
  }


  type Mutation {
    register(name: String, username: String!, email: String!, password: String!): String
    login(email: String!, password: String!): Token
  }
`;

module.exports = typeDefs;