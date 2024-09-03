const typeDefs = `#graphql
    type Post {
        _id: String
        content: String!
        tags: [String]
        imgUrl: String
        authorId: String!
        comments: [Comments]
        likes: [Likes]
        createdAt: String
        updatedAt: String
        author: Author
    }

    type Author {
        _id: String
        username: String
        name: String
        email: String
    }

    type Comments {
        content: String!
        username: String!
        createdAt: String
        updatedAt: String
    }

    type Likes {
        username: String!
        createdAt: String
        updatedAt: String
    }

    type Query {
        getPosts: [Post]
        getPostById(id: String): Post
    }

    input newPost {
    content: String
    tags: [String]
    imgUrl: String
  }

    type Mutation {
        addPost(post: newPost): String
        addComment(idPost:String, content:String, username: String): Comments
        addLike(idPost: String): Likes
    }
`;

module.exports = typeDefs;