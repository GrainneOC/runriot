import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { resultJsonStore } from "./result-json-store.js";

export const trailJsonStore = {
  async getAllTrails() {
    await db.read();
    return db.data.trails;
  },

  async addTrail(trail) {
    await db.read();
    trail._id = v4();
    db.data.trails.push(trail);
    await db.write();
    return trail;
  },

  async getTrailById(id) {
    await db.read();
    let list = db.data.trails.find((trail) => trail._id === id);
    if (list) {
      list.results = await resultJsonStore.getResultsByTrailId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserTrails(userid) {
    await db.read();
    return db.data.trails.filter((trail) => trail.userid === userid);
  },

  async deleteTrailById(id) {
    await db.read();
    const index = db.data.trails.findIndex((trail) => trail._id === id);
    if (index !== -1) db.data.trails.splice(index, 1);
    await db.write();
  },

  async deleteAllTrails() {
    db.data.trails = [];
    await db.write();
  },
};
