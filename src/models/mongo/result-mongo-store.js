import Mongoose from "mongoose";
import { Result } from "./result.js";

export const resultMongoStore = {
  async getAllResults() {
    const results = await Result.find().lean();
    return results;
  },

  async addResult(trailId, result) {
    result.trailid = trailId;
    const newResult = new Result(result);
    const resultObj = await newResult.save();
    return this.getResultById(resultObj._id);
  },

  async getResultsByTrailId(id) {
    const results = await Result.find({ trailid: id }).lean();
    return results;
  },

  async getResultById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const result = await Result.findOne({ _id: id }).lean();
      return result;
    }
    return null;
  },

  async deleteResult(id) {
    try {
      await Result.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllResults() {
    await Result.deleteMany({});
  },

  async updateResult(result, updatedResult) {
    const resultDoc = await Result.findOne({ _id: result._id });
    resultDoc.distance = updatedResult.distance;
    resultDoc.duration = updatedResult.duration;
    resultDoc.date = updatedResult.date;
    await resultDoc.save();
  },
};