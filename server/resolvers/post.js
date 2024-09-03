const Post = require("../models/Post");
const redis = require("../config/redis");


const resolvers = {
    Query: {
        getPosts: async (_, args, contextValue) => {
            contextValue.auth();
            const postCache = await redis.get("posts:all");
            if (postCache) {
                // console.log("di cache")
                return JSON.parse(postCache);
            }
            console.log("dari mongodb")
            const posts = await Post.getAll();
            await redis.set("posts:all", JSON.stringify(posts));
            return posts;
        },

        getPostById: async (_, args, contextValue) => {
            contextValue.auth();
            const { id } = args;
            const foundUser = await Post.getById(id);
            return foundUser;
        },

    },

    Mutation: {
        addPost: async (_, args, contextValue) => {
            const { id } = contextValue.auth();
            const { content } = args.post;
            if (!content) throw new Error("Content is required");

            const newPost = { ...args.post, authorId: id };
            await Post.create(newPost);
            await redis.del("posts:all"); //on-demand
            return "Success add post";
        },

        addComment: async (_, args, contextValue) => {
            const { username } = contextValue.auth();
            const { content, idPost } = args;
            if (!content) throw new Error("Content is required");
            if (!idPost) throw new Error("Id Post is required");

            const newComment = { username, content };
            newComment.createdAt = newComment.updatedAt = new Date();
            await Post.updatePostComment({ ...newComment, idPost });
            // await redis.del("posts:all");
            return newComment;
        },

        addLike: async (_, args, contextValue) => {
            const { username } = contextValue.auth();
            const { idPost } = args;
            if (!idPost) throw new Error("Id Post is required");

            const newLikes = { username };
            newLikes.createdAt = newLikes.updatedAt = new Date();
            await Post.updatePostLike(idPost, username);
            return newLikes;
        },
    }
}

module.exports = resolvers;
