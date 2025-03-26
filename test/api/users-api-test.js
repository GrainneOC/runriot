import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { runriotService } from "./runriot-service.js";
import { aoife, aoifeCredentials, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    runriotService.clearAuth();
    await runriotService.createUser(aoife);
    await runriotService.authenticate(aoifeCredentials);
    await runriotService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await runriotService.createUser(testUsers[i]);
    }
    await runriotService.createUser(aoife);
    await runriotService.authenticate(aoifeCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await runriotService.createUser(aoife);
    assertSubset(aoife, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await runriotService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await runriotService.deleteAllUsers();
    await runriotService.createUser(aoife);
    await runriotService.authenticate(aoifeCredentials);
    returnedUsers = await runriotService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await runriotService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await runriotService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await runriotService.deleteAllUsers();
    await runriotService.createUser(aoife);
    await runriotService.authenticate(aoifeCredentials);
    try {
      const returnedUser = await runriotService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});

