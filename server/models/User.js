const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb")
const { hashPassword } = require("../helpers/bcrypt");

class User {
    static async create(payload) {
        payload.password = hashPassword(payload.password)
        await database.collection("users").insertOne(payload);
        return "Success register";
    }

    static async findByEmail(email) {
        const users = database.collection('users');
        const user = await users.findOne({ email });
        return user
    }

    static async findByUname(username) {
        const agg = [
            {
                $match: {
                    username: username
                },
            },
            {
                $lookup: {
                    from: "follows",
                    localField: "_id",
                    foreignField: "followerId",
                    as: "following",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "following.followingId",
                    foreignField: "_id",
                    as: "followingDetail",
                },
            },
            {
                $lookup: {
                    from: "follows",
                    localField: "_id",
                    foreignField: "followingId",
                    as: "follower",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "follower.followerId",
                    foreignField: "_id",
                    as: "followerDetail",
                },
            },
            {
                $project: {
                    "followerDetail.password": 0,
                    "followingDetail.password": 0,
                    "author.password": 0
                },
            }
        ];
        const users = database.collection("users");
        const cursor = users.aggregate(agg);
        const result = await cursor.toArray();
        return result[0];
    }

    static async findById(_id) {
        const agg = [
            {
                $match: {
                    _id: new ObjectId(String(_id))
                },
            },
            {
                $lookup: {
                    from: "follows",
                    localField: "_id",
                    foreignField: "followerId",
                    as: "following",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "following.followingId",
                    foreignField: "_id",
                    as: "followingDetail",
                },
            },
            {
                $lookup: {
                    from: "follows",
                    localField: "_id",
                    foreignField: "followingId",
                    as: "follower",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "follower.followerId",
                    foreignField: "_id",
                    as: "followerDetail",
                },
            },
            {
                $project: {
                    "followerDetail.password": 0,
                    "followingDetail.password": 0
                },
            }
        ];
        const users = database.collection("users");
        const cursor = users.aggregate(agg);
        const result = await cursor.toArray();
        return result[0];
    }


    static async getAllUser() {
        const agg = [
            {
                $lookup: {
                    from: "follows",
                    localField: "_id",
                    foreignField: "followerId",
                    as: "following",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "following.followingId",
                    foreignField: "_id",
                    as: "followingDetail",
                },
            },
            {
                $lookup: {
                    from: "follows",
                    localField: "_id",
                    foreignField: "followingId",
                    as: "follower",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "follower.followerId",
                    foreignField: "_id",
                    as: "followerDetail",
                },
            },
            {
                $project: {
                    "followerDetail.password": 0,
                    "followingDetail.password": 0,
                    "users.password": 0
                },
            }
        ];
        const users = database.collection("users");
        const cursor = users.aggregate(agg);
        const result = await cursor.toArray();
        return result;
    }
}

module.exports = User;