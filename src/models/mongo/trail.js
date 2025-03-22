import Mongoose from "mongoose";

const { Schema } = Mongoose;

const trailSchema = new Schema({
  title: String,
  location: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Trail = Mongoose.model("Trail", trailSchema);