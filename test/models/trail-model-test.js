import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testTrails, greenway } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Trail Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.trailStore.deleteAllTrails();
    for (let i = 0; i < testTrails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testTrails[i] = await db.trailStore.addTrail(testTrails[i]);
    }
  });

  test("create a trail", async () => {
    const trail = await db.trailStore.addTrail(greenway);
    assertSubset(greenway, trail);
    assert.isDefined(trail._id);
  });

  test("delete all trails", async () => {
    let returnedTrails = await db.trailStore.getAllTrails();
    assert.equal(returnedTrails.length, 3);
    await db.trailStore.deleteAllTrails();
    returnedTrails = await db.trailStore.getAllTrails();
    assert.equal(returnedTrails.length, 0);
  });

  test("get a trail - success", async () => {
    const trail = await db.trailStore.addTrail(greenway);
    const returnedTrail = await db.trailStore.getTrailById(trail._id);
    assertSubset(greenway, trail);
  });

  test("delete One Playist - success", async () => {
    const id = testTrails[0]._id;
    await db.trailStore.deleteTrailById(id);
    const returnedTrails = await db.trailStore.getAllTrails();
    assert.equal(returnedTrails.length, testTrails.length - 1);
    const deletedTrail = await db.trailStore.getTrailById(id);
    assert.isNull(deletedTrail);
  });

  test("get a trail - bad params", async () => {
    assert.isNull(await db.trailStore.getTrailById(""));
    assert.isNull(await db.trailStore.getTrailById());
  });

  test("delete One Trail - fail", async () => {
    await db.trailStore.deleteTrailById("bad-id");
    const allTrails = await db.trailStore.getAllTrails();
    assert.equal(testTrails.length, allTrails.length);
  });
});