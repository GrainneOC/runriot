import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, ResultSpec, ResultSpecPlus, ResultArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const resultApi = {
  find: {
  auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const results = await db.resultStore.getAllResults();
        return results;
      } catch (err) {
        return Boom.serverUnavailable("Database Error:", err);
      }
    },
    tags: ["api"],
    response: { schema: ResultArraySpec, failAction: validationError },
    description: "Get all resultApi",
    notes: "Returns all resultApi",
  },

  findOne: {
  auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const result = await db.resultStore.getResultById(request.params.id);
        if (!result) {
          return Boom.notFound("No result with this id");
        }
        return result;
      } catch (err) {
        return Boom.serverUnavailable("No result with this id:", err);
      }
    },
    tags: ["api"],
    description: "Find a Result",
    notes: "Returns a result",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ResultSpecPlus, failAction: validationError },
  },

  create: {
  auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const result = await db.resultStore.addResult(request.params.id, request.payload);
        if (result) {
          return h.response(result).code(201);
        }
        return Boom.badImplementation("error creating result");
      } catch (err) {
        return Boom.serverUnavailable("Database Error:", err);
      }
    },
    tags: ["api"],
    description: "Create a result",
    notes: "Returns the newly created result",
    validate: { payload: ResultSpec },
    response: { schema: ResultSpecPlus, failAction: validationError },
  },

  deleteAll: {
  auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.resultStore.deleteAllResults();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error:", err);
      }
    },
    tags: ["api"],
    description: "Delete all resultApi",
  },

  deleteOne: {
  auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const result = await db.resultStore.getResultById(request.params.id);
        if (!result) {
          return Boom.notFound("No Result with this id");
        }
        await db.resultStore.deleteResult(result._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Result with this id:", err);
      }
    },
    tags: ["api"],
    description: "Delete a result",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};