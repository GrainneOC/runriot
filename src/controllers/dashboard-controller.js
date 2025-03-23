import { TrailSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const trails = await db.trailStore.getUserTrails(loggedInUser._id);
      const viewData = {
        title: "Run Riot Dashboard",
        user: loggedInUser,
        trails: trails,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addTrail: {
    validate: {
      payload: TrailSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Trail error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newTrail = {
        userid: loggedInUser._id,
        title: request.payload.title,
        location: request.payload.location
      };
      await db.trailStore.addTrail(newTrail);
      return h.redirect("/dashboard");
    },
  },

  deleteTrail: {
    handler: async function (request, h) {
      const trail = await db.trailStore.getTrailById(request.params.id);
      await db.trailStore.deleteTrailById(trail._id);
      return h.redirect("/dashboard");
    },
  },
};
