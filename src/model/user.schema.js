const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Task = require("./task.schema");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    role: {
      type: String,
      enum: ["Normal", "Admin"],
      default: "Normal",
    },
  },
  { timestamps: true }
);

userSchema.post("findOneAndDelete", async (doc, next) => {
  const tasks = doc.tasks;

  if (Boolean(tasks)) {
    const final = await Promise.all(
      tasks.map(async (id) => {
        await Task.findOneAndDelete({ _id: id });
      })
    );
  }

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
