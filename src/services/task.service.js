const { StatusCodes } = require("http-status-codes");
const { customError } = require("../util/common");
const { taskRepository } = require("../repository");
const taskRepo = new taskRepository();

async function createTask(data) {
  try {
    const task = await taskRepo.create(data);
    return task;
  } catch (error) {
    throw new customError(error.message, StatusCodes.BAD_REQUEST, error.name);
  }
}
module.exports = {
  createTask,
};
