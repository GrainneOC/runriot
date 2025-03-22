import { ResultSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const trailController = {
  index: {
    handler: async function (request, h) {
      const trail = await db.trailStore.getTrailById(request.params.id);
      const viewData = {
        title: "Trail",
        trail: trail,
      };
      return h.view("trail-view", viewData);
    },
  },

  addResult: {
    validate: {
      payload: ResultSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("trail-view", { title: "Add result error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const trail = await db.trailStore.getTrailById(request.params.id);
      const newResult = {
        distance: Number(request.payload.distance),
        duration: Number(request.payload.artist),
        date: request.payload.date,
      };
      await db.resultStore.addResult(trail._id, newResult);
      return h.redirect(`/trail/${trail._id}`);
    },
  },

  deleteResult: {
    handler: async function (request, h) {
      const trail = await db.trailStore.getTrailById(request.params.id);
      await db.resultStore.deleteResult(request.params.resultid);
      return h.redirect(`/trail/${trail._id}`);
    },
  },
};
