const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../util/common");
const { TaskValidationSchema } = require("../validations");

async function createTaskValidate(req, res, next) {
  const { error } = await TaskValidationSchema.createTaskSchema.validate({
    ...req.body,
    user: req.user.id,
  });
  if (error) {
    errorResponse.Message = error.details[0].message;
    errorResponse.Error = "Joi Validation Error while creating task";
    errorResponse.StatusCode = StatusCodes.BAD_REQUEST;
    res.status(errorResponse.StatusCode).json(errorResponse);
    return;
  } else {
    next();
  }
}

async function updateTaskValidate(req, res, next) {
  const { error } = await TaskValidationSchema.updateTaskSchema.validate(
    req.body
  );
  if (error) {
    errorResponse.Message = error.details[0].message;
    errorResponse.Error = "Joi Validation Error while updating task";
    errorResponse.StatusCode = StatusCodes.BAD_REQUEST;
    res.status(errorResponse.StatusCode).json(errorResponse);
    return;
  } else {
    next();
  }
}

module.exports = {
  createTaskValidate,
  updateTaskValidate,
};
