import { ResultSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const resultController = {
  index: {
    handler: async function (request, h) {
      const trail = await db.trailStore.getTrailById(request.params.id);
      const result = await db.resultStore.getResultById(request.params.resultid);
      const viewData = {
        title: "Edit Result",
        trail: trail,
        result: result,
      };
      return h.view("result-view", viewData);
    },
  },

  update: {
    validate: {
      payload: ResultSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("result-view", { title: "Edit result error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const result = await db.resultStore.getResultById(request.params.resultid);
      const newResult = {
        distance: Number(request.payload.distance),
        duration: Number(request.payload.duration),
        date: request.payload.date,
      };
      await db.resultStore.updateResult(result, newResult);
      return h.redirect(`/trail/${request.params.id}`);
    },
  },
};