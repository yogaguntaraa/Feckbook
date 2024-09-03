const Follow = require("../models/Follow")
const resolvers = {
    Mutation: {
        addFollow: async (_, args, contextValue) => {
            const { id: followerId } = contextValue.auth();
            const { followingId } = args;
            if (!followingId) throw new Error("Following Id is required");

            const newFollow = { followingId, followerId };
            newFollow.createdAt = newFollow.updatedAt = new Date();
            await Follow.create(followingId, followerId);
            return "Success following";
        },
    },
};

module.exports = resolvers;