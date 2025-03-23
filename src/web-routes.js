import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { trailController } from "./controllers/trail-controller.js";
import { resultController } from "./controllers/result-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addtrail", config: dashboardController.addTrail },
  { method: "GET", path: "/dashboard/deletetrail/{id}", config: dashboardController.deleteTrail },

  { method: "GET", path: "/trail/{id}", config: trailController.index },
  { method: "POST", path: "/trail/{id}/addresult", config: trailController.addResult },
  { method: "GET", path: "/trail/{id}/deleteresult/{resultid}", config: trailController.deleteResult },

  { method: "GET", path: "/result/{id}/editresult/{resultid}", config: resultController.index },
  { method: "POST", path: "/result/{id}/updateresult/{resultid}", config: resultController.update },

  { method: "POST", path: "/trail/{id}/uploadimage", config: trailController.uploadImage },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];