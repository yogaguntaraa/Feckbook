require('dotenv').config()

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const typeDefsUser = require("./schemas/user");
const typeDefsPost = require("./schemas/post");
const typeDefsFollow = require("./schemas/follow")
const resolversUser = require("./resolvers/user");
const resolversPost = require("./resolvers/post");
const resolversFollow = require("./resolvers/follow")

const { verifyToken } = require("./helpers/jwt")
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs: [typeDefsUser, typeDefsPost, typeDefsFollow],
    resolvers: [resolversUser, resolversPost, resolversFollow],
    introspection: true,
});

async function startServer() {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 3000 },
        context: async ({ req }) => {
            return {
                auth: () => {
                    const authorization = req.headers.authorization;
                    if (!authorization) throw new Error("Please login first!");

                    const [type, token] = authorization.split(" ");
                    if (type !== "Bearer") throw new Error("Invalid token!");

                    const decoded = verifyToken(token);
                    return decoded;
                }
            };
        },
    });

    console.log(`🚀  Server ready at: ${url}`);
}

startServer();