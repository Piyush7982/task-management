const { StatusCodes } = require("http-status-codes");
const { errorResponse, successResponse } = require("../util/common");
const { jwt } = require("../util/authorisation");
const { UserValidationSchema } = require("../validations");

async function authenticationMiddleware(req, res, next) {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      errorResponse.Message = "Token not found";
      errorResponse.Error = "Authentication Error";
      errorResponse.StatusCode = StatusCodes.UNAUTHORIZED;
      res.status(errorResponse.StatusCode).json(errorResponse);
      return;
    }
    const response = await jwt.tokenVerify(token);

    if (!response.id) {
      errorResponse.Message = "user not found";
      errorResponse.Error = "Authentication Error";
      errorResponse.StatusCode = StatusCodes.UNAUTHORIZED;
      res.status(errorResponse.StatusCode).json(errorResponse);
      return;
    }
    req.user = response;

    next();
  } catch (error) {
    errorResponse.Message = error.Message;
    errorResponse.Error = error.name;
    errorResponse.StatusCode = StatusCodes.REQUEST_TIMEOUT;
    res.status(errorResponse.StatusCode).json(errorResponse);
    return;
  }
}
async function createUserValidate(req, res, next) {
  const { error } = await UserValidationSchema.createUserSchema.validate(
    req.body
  );
  if (error) {
    errorResponse.Message = error.details[0].message;
    errorResponse.Error = "Joi Validation Error while creating user";
    errorResponse.StatusCode = StatusCodes.BAD_REQUEST;
    res.status(errorResponse.StatusCode).json(errorResponse);
    return;
  } else {
    next();
  }
}

async function updateUserValidate(req, res, next) {
  const { error } = await UserValidationSchema.updateUserSchema.validate(
    req.body
  );
  if (error) {
    errorResponse.Message = error.details[0].message;
    errorResponse.Error = "Joi Validation Error while updating user";
    errorResponse.StatusCode = StatusCodes.BAD_REQUEST;
    res.status(errorResponse.StatusCode).json(errorResponse);
    return;
  } else {
    next();
  }
}

async function loginValidate(req, res, next) {
  const { error } = await UserValidationSchema.loginSchema.validate(req.body);
  if (error) {
    errorResponse.Message = error.details[0].message;
    errorResponse.Error = "Joi Validation Error while login";
    errorResponse.StatusCode = StatusCodes.BAD_REQUEST;
    res.status(errorResponse.StatusCode).json(errorResponse);
    return;
  } else {
    next();
  }
}
async function isLoggedIn(req, res, next) {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      errorResponse.Message = "false";
      errorResponse.Error = "not logged in";
      errorResponse.StatusCode = StatusCodes.UNAUTHORIZED;
      res.status(errorResponse.StatusCode).json(errorResponse);
      return;
    }
    const response = await jwt.tokenVerify(token);

    if (!response.id) {
      errorResponse.Message = "false";
      errorResponse.Error = "not a authenticated user";
      errorResponse.StatusCode = StatusCodes.UNAUTHORIZED;
      res.status(errorResponse.StatusCode).json(errorResponse);
      return;
    }
    req.user = response;

    successResponse.Message = "true";
    successResponse.Data = response;
    successResponse.StatusCode = StatusCodes.OK;
    res.status(successResponse.StatusCode).json(successResponse);
    next();
  } catch (error) {
    errorResponse.Message = error.Message;
    errorResponse.Error = error.name;
    errorResponse.StatusCode = StatusCodes.REQUEST_TIMEOUT;
    res.status(errorResponse.StatusCode).json(errorResponse);
    return;
  }
}
module.exports = {
  authenticationMiddleware,
  createUserValidate,
  updateUserValidate,
  loginValidate,
  isLoggedIn,
};
