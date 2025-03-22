import { EventEmitter } from "events";
import { assert } from "chai";
import { runriotService } from "./runriot-service.js";
import { assertSubset } from "../test-utils.js";
import { aoife, greenway, testTrails } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Trail API tests", () => {
  let user = null;

  setup(async () => {
    await runriotService.deleteAllTrails();
    await runriotService.deleteAllUsers();
    user = await runriotService.createUser(aoife);
    greenway.userid = user._id;
  });

  teardown(async () => {});

  test("create trail", async () => {
    const returnedTrail = await runriotService.createTrail(greenway);
    assert.isNotNull(returnedTrail);
    assertSubset(greenway, returnedTrail);
  });

  test("delete a trail", async () => {
    const trail = await runriotService.createTrail(greenway);
    const response = await runriotService.deleteTrail(trail._id);
    assert.equal(response.status, 204);
    try {
      const returnedTrail = await runriotService.getTrail(trail.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message.startsWith("No Trail with this id"), "Incorrect Response Message");
    }
  });

  test("create multiple trails", async () => {
    for (let i = 0; i < testTrails.length; i += 1) {
      testTrails[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await runriotService.createTrail(testTrails[i]);
    }
    let returnedLists = await runriotService.getAllTrails();
    assert.equal(returnedLists.length, testTrails.length);
    await runriotService.deleteAllTrails();
    returnedLists = await runriotService.getAllTrails();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant trail", async () => {
    try {
      const response = await runriotService.deleteTrail("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message.startsWith("No Trail with this id"), "Incorrect Response Message");
    }
  });
});