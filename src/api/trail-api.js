import Boom from "@hapi/boom";
import { IdSpec, TrailSpec, TrailSpecPlus, TrailArraySpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const trailApi = {
  find: {
      auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const trails = await db.trailStore.getAllTrails();
        return trails;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: TrailArraySpec, failAction: validationError },
    description: "Get all trails",
    notes: "Returns all trails",
  },

  findOne: {
      auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const trail = await db.trailStore.getTrailById(request.params.id);
        if (!trail) {
          return Boom.notFound("No Trail with this id");
        }
        return trail;
      } catch (err) {
        return Boom.serverUnavailable("No Trail with this id");
      }
    },
    tags: ["api"],
    description: "Find a Trail",
    notes: "Returns a trail",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: TrailSpecPlus, failAction: validationError },
  },

  create: {
      auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const trail = request.payload;
        const newTrail = await db.trailStore.addTrail(trail);
        if (newTrail) {
          return h.response(newTrail).code(201);
        }
        return Boom.badImplementation("error creating trail");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Trail",
    notes: "Returns the newly created trail",
    validate: { payload: TrailSpec, failAction: validationError },
    response: { schema: TrailSpecPlus, failAction: validationError },
  },

  deleteOne: {
      auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const trail = await db.trailStore.getTrailById(request.params.id);
        if (!trail) {
          return Boom.notFound("No Trail with this id");
        }
        await db.trailStore.deleteTrailById(trail._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Trail with this id");
      }
    },
    tags: ["api"],
    description: "Delete a trail",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
      auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.trailStore.deleteAllTrails();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all TrailApi",
  },
};