const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
const User = mongoose.model("User", userSchema);
module.exports = User;

// [{
//   $match: { _id: ObjectId("65aed33d82c4e8e539d15184") },
// },
// {
//   $project: {
//     _id: 1,
//     tasks: 1,
//   },
// },
// {
//   $unwind: "$tasks",
// },
// {
//   $lookup: {
//     from: "tasks",
//     localField: "tasks",
//     foreignField: "_id",
//     as: "tasks",
//   },
// },
// {
//   $unwind: "$tasks",
// },
// {
//   $sort: { "tasks.createdAt": -1 },
// },
// {
//   $skip: 10 * (1 - 1),
// },
// {
//   $limit: 1,
// },]
