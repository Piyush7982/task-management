const { userService } = require("../services");
const {
  successResponse,
  errorResponse,
  customError,
} = require("../util/common");

async function createUser(req, res) {
  try {
    const user = await userService.createUser(req.body);
    successResponse.Data = user;
    successResponse.Message = "User created successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to create user";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}

async function getUserById(req, res) {
  try {
    const user = await userService.getUserById(req.params.id);
    successResponse.Data = user;
    successResponse.Message = "User fetched successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to fetch user";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}

async function updateUser(req, res) {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    successResponse.Data = user;
    successResponse.Message = "User updated successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to update user";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}

async function deleteUser(req, res) {
  try {
    const user = await userService.deleteUser(req.params.id);
    successResponse.Data = user;
    successResponse.Message = "User deleted successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to delete user";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
