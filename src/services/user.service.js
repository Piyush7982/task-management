const { StatusCodes } = require("http-status-codes");
const { customError } = require("../util/common");
const { userRepository } = require("../repository");
const userRepo = new userRepository();

async function createUser(data) {
  try {
    const user = await userRepo.create(data);
    return user;
  } catch (error) {
    throw new customError(error.message, StatusCodes.BAD_REQUEST, error.name);
  }
}

async function getUserById(id) {
  try {
    const user = await userRepo.findOne(id);
    return user;
  } catch (error) {
    throw new customError(error.message, StatusCodes.BAD_REQUEST, error.name);
  }
}

async function updateUser(id, data) {
  try {
    const user = await userRepo.update(id, data);
    return user;
  } catch (error) {
    throw new customError(error.message, StatusCodes.BAD_REQUEST, error.name);
  }
}

async function deleteUser(id) {
  try {
    const user = await userRepo.delete(id);
    return user;
  } catch (error) {
    throw new customError(error.message, StatusCodes.BAD_REQUEST, error.name);
  }
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
