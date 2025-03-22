import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const resultJsonStore = {
  async getAllResults() {
    await db.read();
    return db.data.results;
  },

  async addResult(trailId, result) {
    await db.read();
    result._id = v4();
    result.trailid = trailId;
    db.data.results.push(result);
    await db.write();
    return result;
  },

  async getResultsByTrailId(id) {
    await db.read();
    let t = db.data.results.filter((result) => result.trailid === id);
    if (t === undefined) t = null;
    return t;
  },

  async getResultById(id) {
    await db.read();
    let t = db.data.results.find((result) => result._id === id);
    if (t === undefined) t = null;
    return t;
  },

  async deleteResult(id) {
    await db.read();
    const index = db.data.results.findIndex((result) => result._id === id);
    if (index !== -1) db.data.results.splice(index, 1);
    await db.write();
  },

  async deleteAllResults() {
    db.data.results = [];
    await db.write();
  },

  async updateResult(result, updatedResult) {
    result.distance = updatedResult.distance;
    result.duration = updatedResult.duration;
    result.date = updatedResult.date;
    await db.write();
  },
};
