const crud = require("./crud.repository");
const { Task } = require("../model");
const { customError } = require("../util/common");
const { StatusCodes } = require("http-status-codes");

class taskRepository extends crud {
  constructor() {
    super(Task);
  }
}
module.exports = taskRepository;
