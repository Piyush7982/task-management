const Joi = require("joi");

const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{5,29}$/;
const nameRegex = /^[A-Za-z]{1}[A-Za-z\s]{2,}[A-Za-z]{1}$/;
const email_regex =
  /^(?=.*[a-zA-Z])[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+\.[a-zA-Z]+$/;

const createUserSchema = Joi.object({
  name: Joi.string()
    .min(4)
    .pattern(nameRegex)
    .message("invalid name")
    .required(),
  email: Joi.string()
    .min(4)
    .pattern(email_regex)
    .message("invalid email")
    .required(),
  userName: Joi.string()
    .min(4)
    .pattern(usernameRegex)
    .message("invalid username")
    .required(),
  occupation: Joi.string().min(4).required(),
  password: Joi.string().min(8).required(),
  tasks: Joi.array().items(Joi.string()),
  role: Joi.string().valid("Normal", "Admin").default("Normal"),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(4).pattern(nameRegex).message("invalid name"),
  occupation: Joi.string().min(4),
  password: Joi.string().min(8),
  role: Joi.string().valid("Normal", "Admin"),
});
const loginSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  loginSchema,
};
