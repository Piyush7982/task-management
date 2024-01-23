const { StatusCodes } = require("http-status-codes");
const { customError } = require("../util/common");
const { userRepository } = require("../repository");
const { bcrypt, jwt } = require("../util/authorisation");
const userRepo = new userRepository();

async function createUser(data) {
  try {
    const { userName, email, password } = data;
    if (await userRepo.exists({ userName })) {
      throw new customError(
        "User with this username already exists",
        StatusCodes.BAD_REQUEST
      );
    }
    if (await userRepo.exists({ email })) {
      throw new customError(
        "User with this email already exists",
        StatusCodes.BAD_REQUEST,
        "Duplication error"
      );
    }
    const hashedPassword = await bcrypt.hashPassword(password);
    const user = await userRepo.create({
      ...data,
      password: hashedPassword,
    });
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    if (!(await userRepo.existsById({ id }))) {
      throw new customError(
        "User with this id doesnot exists",
        StatusCodes.NOT_FOUND,
        "Not Found error"
      );
    }
    const user = await userRepo.findOne(id);
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, data) {
  try {
    if (!(await userRepo.existsById({ id }))) {
      throw new customError(
        "User with this id doesnot exists",
        StatusCodes.NOT_FOUND,
        "Not Found error"
      );
    }
    const user = await userRepo.update(id, data);
    return user;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(id) {
  try {
    if (!(await userRepo.existsById({ id }))) {
      throw new customError(
        "User with this id doesnot exists",
        StatusCodes.NOT_FOUND,
        "Not Found error"
      );
    }
    const user = await userRepo.delete(id);
    return user;
  } catch (error) {
    throw error;
  }
}
async function login(userData) {
  try {
    const { userName, password } = userData;
    const user = await userRepo.getUserByCredential({ userName });

    if (!Boolean(user)) {
      throw new customError(
        "User with this username doesnot exists",
        StatusCodes.UNAUTHORIZED,
        "Validation Error"
      );
    }

    if (!(await bcrypt.verifyPassword(password, user.password))) {
      throw new customError(
        "Incorrect Password",
        StatusCodes.UNAUTHORIZED,
        "Validation Error"
      );
    }
    const username = user.userName;
    const id = user._id;
    const email = user.email;
    const token = await jwt.tokenGenerate({
      id: user._id,
      userName: userName,
      email: email,
      // expiryInSec: 60 * 60,
    });
    return { token, username, id, email };
  } catch (error) {
    throw error;
  }
}

async function getUserTasks(data) {
  try {
    const { id, page, limit } = data;
    // console.log(data);
    if (!(await userRepo.existsById({ id }))) {
      throw new customError(
        "User with this id doesnot exists",
        StatusCodes.NOT_FOUND,
        "Not Found error"
      );
    }

    const tasks = await userRepo.findAllTasks(id, page, limit);
    return tasks;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  getUserTasks,
};
