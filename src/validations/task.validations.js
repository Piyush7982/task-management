const Joi = require("joi");

const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(3).max(200).required(),
  completed: Joi.boolean().default(false),
  dueDate: Joi.date().required(),
  priority: Joi.string().valid("Low", "Medium", "High").default("Low"),
  user: Joi.string().required(),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(50),
  description: Joi.string().min(3).max(200),
  completed: Joi.boolean(),
  dueDate: Joi.date(),
  priority: Joi.string().valid("Low", "Medium", "High"),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
