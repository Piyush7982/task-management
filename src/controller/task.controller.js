const { taskService } = require("../services");
const {
  successResponse,
  errorResponse,
  customError,
} = require("../util/common");

async function createTask(req, res) {
  try {
    const task = await taskService.createTask(req.body);
    successResponse.Data = task;
    successResponse.Message = "Task created successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to create task";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}

async function getTaskById(req, res) {
  try {
    const task = await taskService.getTaskById(req.params.id);
    successResponse.Data = task;
    successResponse.Message = "Task fetched successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to fetch task";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}

async function updateTask(req, res) {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    successResponse.Data = task;
    successResponse.Message = "Task updated successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to update task";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}

async function deleteTask(req, res) {
  try {
    const task = await taskService.deleteTask(req.params.id);
    successResponse.Data = task;
    successResponse.Message = "Task deleted successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to delete task";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}

module.exports = {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
