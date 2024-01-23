const { userService } = require("../services");
const {
  successResponse,
  errorResponse,
  customError,
} = require("../util/common");

async function createAdmin(req, res) {
  try {
    const admin = await userService.createAdmin({
      userName: req.body.userName,
    });
    successResponse.Data = admin;
    successResponse.Message = "User created successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to create user";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    successResponse.Data = users;
    successResponse.Message = "Users fetched successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to fetch users";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}

async function removeAdmin(req, res) {
  try {
    const admin = await userService.removeAdmin({
      userName: req.body.userName,
    });
    successResponse.Data = admin;
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
    const user = await userService.deleteUser({
      userName: req.body.userName,
      id: req.body.id,
    });
    successResponse.Data = user;
    successResponse.Message = "User deleted successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to delete user";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}

async function getAllAdmins(req, res) {
  try {
    const admins = await userService.getAllAdmins();
    successResponse.Data = admins;
    successResponse.Message = "Admins fetched successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to fetch admins";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}

async function adminLogin(req, res) {
  try {
    const admin = await userService.adminLogin({
      userName: req.body.userName,
      password: req.body.password,
    });
    successResponse.Data = admin;
    successResponse.Message = "Admin logged in successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to login admin";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
module.exports = {
  createAdmin,
  getAllUsers,
  removeAdmin,
  deleteUser,
  getAllAdmins,
  adminLogin,
};
