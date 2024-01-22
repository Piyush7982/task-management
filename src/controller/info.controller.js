const { successResponse, errorResponse } = require("../util/common");
async function getServerStatus(req, res) {
  try {
    successResponse.Data = "Server is running";
    successResponse.Message = "You are good to go!";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to get server status";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
module.exports = { getServerStatus };
