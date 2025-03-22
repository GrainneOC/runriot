import { v4 } from "uuid";

let trails = [];

export const resultMemStore = {
  async getAllTrails() {
    return trails;
  },

  async addTrail(trailId, trail) {
    trail._id = v4();
    trail.trailid = trailId;
    trails.push(trail);
    return trail;
  },

  async getTrailsByTrailId(id) {
    return trails.filter((trail) => trail.trailid === id);
  },

  async getTrailById(id) {
    let foundTrail = trails.find((trail) => trail._id === id);
    if (!foundTrail) {
      foundTrail = null;
    }
    return foundTrail;
  },

  async getTrailTrails(trailId) {
    let foundTrails = trails.filter((trail) => trail.trailid === trailId);
    if (!foundTrails) {
      foundTrails = null;
    }
    return foundTrails;
  },

  async deleteTrail(id) {
    const index = trails.findIndex((trail) => trail._id === id);
    if (index !== -1) trails.splice(index, 1);
  },

  async deleteAllTrails() {
    trails = [];
  },

  async updateTrail(trail, updatedTrail) {
    trail.distance = updatedTrail.distance;
    trail.duration = updatedTrail.duration;
    trail.date = updatedTrail.date;
  },
};
