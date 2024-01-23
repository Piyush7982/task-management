const { StatusCodes } = require("http-status-codes");
const { customError } = require("../util/common");
const { taskRepository } = require("../repository");
const userService = require("./user.service");
const taskRepo = new taskRepository();

async function createTask(data) {
  try {
    const task = await taskRepo.create(data);
    await userService.updateUser(data.user, {
      $push: { tasks: task._id },
    });
    return task;
  } catch (error) {
    throw error;
  }
}

async function getTaskById(id) {
  try {
    if (!(await taskRepo.existsById({ id }))) {
      throw new customError(
        "Task with this id doesnot exists",
        StatusCodes.NOT_FOUND,
        "Not Found error"
      );
    }
    const task = await taskRepo.findOne(id);
    return task;
  } catch (error) {
    throw error;
  }
}

async function updateTask(id, data) {
  try {
    if (!(await taskRepo.existsById({ id }))) {
      throw new customError(
        "Task with this id doesnot exists",
        StatusCodes.NOT_FOUND,
        "Not Found error"
      );
    }
    const task = await taskRepo.update(id, data);
    return task;
  } catch (error) {
    throw error;
  }
}

async function deleteTask(id) {
  try {
    if (!(await taskRepo.existsById({ id }))) {
      throw new customError(
        "Task with this id doesnot exists",
        StatusCodes.NOT_FOUND,
        "Not Found error"
      );
    }
    const task = await taskRepo.delete(id);
    return task;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
