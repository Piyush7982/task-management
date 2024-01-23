const crud = require("./crud.repository");
const { User } = require("../model");
const { customError } = require("../util/common");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");

class userRepository extends crud {
  constructor() {
    super(User);
  }
  async getUserByCredential(data) {
    try {
      const user = await User.findOne(data);
      return user;
    } catch (error) {
      throw error;
    }
  }
  async exists(data) {
    try {
      const result = await this.model.exists(data);
      return Boolean(result);
    } catch (error) {
      throw new customError(
        error.message,
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.name
      );
    }
  }
  async existsById(id) {
    try {
      const result = await User.exists({
        _id: new mongoose.Types.ObjectId(id),
      });
      return Boolean(result);
    } catch (error) {
      throw new customError(
        error.message,
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.name
      );
    }
  }
  async findAllTasks(id, page = 1, limit = 5) {
    try {
      const tasks = await User.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: "tasks",
            let: { tasks: "$tasks" },
            pipeline: [
              { $match: { $expr: { $in: ["$_id", "$$tasks"] } } },
              { $sort: { createdAt: -1 } },
              { $skip: (page - 1) * limit * 1 },
              { $limit: limit * 1 },
            ],
            as: "tasks",
          },
        },
        {
          $project: {
            _id: 1,
            tasks: 1,
          },
        },
      ]);
      return tasks;
    } catch (error) {
      throw error;
    }
  }
  async deleteByUsername(userName) {
    try {
      const result = await this.model.findOneAndDelete({ userName });
      return result;
    } catch (error) {
      throw new customError(
        error.message,
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.name
      );
    }
  }
}
module.exports = userRepository;
