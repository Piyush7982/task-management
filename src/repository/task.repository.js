const crud = require("./crud.repository");

const { Task } = require("../model");
const { customError } = require("../util/common");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");

class taskRepository extends crud {
  constructor() {
    super(Task);
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
      const result = await Task.exists({
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
}
module.exports = taskRepository;
