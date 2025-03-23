import { userApi } from "./api/user-api.js";
import { trailApi } from "./api/trail-api.js";
import { resultApi } from "./api/result-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/trails", config: trailApi.create },
  { method: "DELETE", path: "/api/trails", config: trailApi.deleteAll },
  { method: "GET", path: "/api/trails", config: trailApi.find },
  { method: "GET", path: "/api/trails/{id}", config: trailApi.findOne },
  { method: "DELETE", path: "/api/trails/{id}", config: trailApi.deleteOne },

  { method: "GET", path: "/api/results", config: resultApi.find },
  { method: "GET", path: "/api/results/{id}", config: resultApi.findOne },
  { method: "POST", path: "/api/trails/{id}/results", config: resultApi.create },
  { method: "DELETE", path: "/api/results", config: resultApi.deleteAll },
  { method: "DELETE", path: "/api/results/{id}", config: resultApi.deleteOne },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

];