import { v4 } from "uuid";

let results = [];

export const resultMemStore = {
  async getAllResults() {
    return results;
  },

  async addResult(trailId, result) {
    result._id = v4();
    result.trailid = trailId;
    results.push(result);
    return result;
  },

  async getResultsByTrailId(id) {
    return results.filter((result) => result.trailid === id);
  },

  async getResultById(id) {
    let foundResult = results.find((result) => result._id === id);
    if (!foundResult) {
      foundResult = null;
    }
    return foundResult;
  },

  async getTrailResults(trailId) {
    let foundResults = results.filter((result) => result.trailid === trailId);
    if (!foundResults) {
      foundResults = null;
    }
    return foundResults;
  },

  async deleteResult(id) {
    const index = results.findIndex((result) => result._id === id);
    if (index !== -1) results.splice(index, 1);
  },

  async deleteAllResults() {
    results = [];
  },

  async updateResult(result, updatedResult) {
    result.distance = updatedResult.distance;
    result.duration = updatedResult.duration;
    result.date = updatedResult.date;
  },
};
