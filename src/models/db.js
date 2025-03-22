import { userMemStore } from "./mem/user-mem-store.js";
import { trailMemStore } from "./mem/trail-mem-store.js";
import { resultMemStore } from "./mem/result-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { trailJsonStore } from "./json/trail-json-store.js";
import { resultJsonStore } from "./json/result-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { trailMongoStore } from "./mongo/trail-mongo-store.js";
import { resultMongoStore } from "./mongo/result-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  trailStore: null,
  resultStore: null,

  init(storeType) {
    switch (storeType) {
      case "json" :
        this.userStore = userJsonStore;
        this.trailStore = trailJsonStore;
        this.resultStore = resultJsonStore;
        break;
      case "mongo" :
        this.userStore = userMongoStore;
        this.trailStore = trailMongoStore;
        this.resultStore = resultMongoStore;
        connectMongo();
        break;
      default :
        this.userStore = userMemStore;
        this.trailStore = trailMemStore;
        this.resultStore = resultMemStore;
    }
  }
};
