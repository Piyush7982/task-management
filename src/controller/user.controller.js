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
async function login(req, res) {
  try {
    const user = await userService.login({
      userName: req.body.userName,
      password: req.body.password,
    });
    const { username, id, email } = user;
    successResponse.Data = { username, id, email };
    successResponse.Message = "User logged in successfully";
    res.cookie("access_token", user.token, {
      // httpOnly: true,
      // sameSite: "strict",
      secure: true,
    });

    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to login user";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("access_token");
    successResponse.Message = "User logged out successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to logout user";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}

async function getAllTasks(req, res) {
  try {
    const tasks = await userService.getUserTasks({
      id: req.params.id,
      page: req.query.page,
      limit: req.query.limit,
    });
    successResponse.Data = tasks;
    successResponse.Message = "Tasks fetched successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to fetch tasks";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  logout,
  getAllTasks,
};
