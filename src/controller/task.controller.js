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

module.exports = {
  createTask,
};
