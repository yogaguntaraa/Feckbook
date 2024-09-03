const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb")

class Post {
    static async create(newPost) {
        const { authorId, content, tags, imgUrl } = newPost;
        const Post = database.collection("posts");
        await Post.insertOne({
            content: content,
            tags: tags,
            imgUrl: imgUrl,
            authorId: new ObjectId(String(authorId)),
            comments: [],
            likes: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    static async getAll() {
        const agg = [
            {
                $sort: { createdAt: -1 }
            },
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'authorId',
                    'foreignField': '_id',
                    'as': 'author'
                }
            }, {
                '$unwind': {
                    'path': '$author',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    'author.password': 0
                }
            }
        ]

        const post = database.collection("posts");
        const cursor = post.aggregate(agg);
        const result = await cursor.toArray();
        return result;
    }

    static async getById(_id) {

        const agg = [
            {
                $match: {
                    _id: new ObjectId(String(_id))
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'authorId',
                    foreignField: '_id',
                    as: 'author'
                }
            },
            {
                $unwind: {
                    path: '$author',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    'author.password': 0
                }
            }
        ];
        const post = database.collection("posts");
        const cursor = post.aggregate(agg);
        const result = await cursor.toArray();
        return result[0]
    }

    static async updatePostComment(payload) {
        const { idPost, username, content } = payload;
        const posts = database.collection("posts");
        const post = await posts.updateOne(
            { _id: new ObjectId(String(idPost)) },
            {
                $push: {
                    comments: {
                        content,
                        username,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                },
            }
        );
        return post;
    }

    static async updatePostLike(idPost, username) {
        const posts = database.collection("posts");
        const post = await posts.updateOne(
            { _id: new ObjectId(String(idPost)) },
            {
                $push: {
                    likes: {
                        username,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                },
            }
        );
        return post;
    }
}

module.exports = Post;