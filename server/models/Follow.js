const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class Follow {
  static async create(followingId, followerId) {
    const Follows = database.collection("follows");
    await Follows.insertOne({
      followingId: new ObjectId(String(followingId)),
      followerId: new ObjectId(String(followerId)),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

module.exports = Follow;