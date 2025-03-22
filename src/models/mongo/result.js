import Mongoose from "mongoose";

const { Schema } = Mongoose;

const resultSchema = new Schema({
  distance: Number,
  duration: Number,
  date: String,
  trailId: {
    type: Schema.Types.ObjectId,
    ref: "Trail",
  },
});

export const Result = Mongoose.model("Result", resultSchema);