import { v4 } from "uuid";
import { resultMemStore } from "./result-mem-store.js";

let trails = [];

export const trailMemStore = {
  async getAllTrails() {
    return trails;
  },

  async addTrail(trail) {
    trail._id = v4();
    trails.push(trail);
    return trail;
  },

  async getTrailById(id) {
    const list = trails.find((trail) => trail._id === id);
    if (list) {
      list.results = await resultMemStore.getResultsByTrailId(list._id);
      return list;
    }
    return null;
  },

  async getUserTrails(userid) {
    return trails.filter((trail) => trail.userid === userid);
  },

  async deleteTrailById(id) {
    const index = trails.findIndex((trail) => trail._id === id);
    if (index !== -1) trails.splice(index, 1);
  },

  async deleteAllTrails() {
    trails = [];
  },
};
