const crud = require("./crud.repository");
const { User } = require("../model");
const { customError } = require("../util/common");
const { StatusCodes } = require("http-status-codes");

class userRepository extends crud {
  constructor() {
    super(User);
  }
}
module.exports = userRepository;
