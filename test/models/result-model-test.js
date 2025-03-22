import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testTrails, testResults, testrun, greenway, testresult, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Result Model tests", () => {

  let testrunList = null;

  setup(async () => {
    db.init("mongo");
    await db.trailStore.deleteAllTrails();
    await db.resultStore.deleteAllResults();
    testrunList = await db.trailStore.addTrail(testrun);
    for (let i = 0; i < testResults.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testResults[i] = await db.resultStore.addResult(testrunList._id, testResults[i]);
    }
  });

  test("create single result", async () => {
    const greenwayList = await db.trailStore.addTrail(greenway);
    const result = await db.resultStore.addResult(greenwayList._id, testresult)
    assert.isNotNull(result._id);
    assertSubset (testresult, result);
  });

  test("create multiple resultApi", async () => {
    const results = await db.trailStore.getTrailById(testrunList._id);
    assert.equal(testResults.length, testResults.length)
  });

  test("delete all resultApi", async () => {
    const results = await db.resultStore.getAllResults();
    assert.equal(testResults.length, results.length);
    await db.resultStore.deleteAllResults();
    const newResults = await db.resultStore.getAllResults();
    assert.equal(0, newResults.length);
  });

  test("get a result - success", async () => {
    const greenwayList = await db.trailStore.addTrail(greenway);
    const result = await db.resultStore.addResult(greenwayList._id, testresult)
    const newResult = await db.resultStore.getResultById(result._id);
    assertSubset (testresult, newResult);
  });

  test("delete One Result - success", async () => {
    const id = testResults[0]._id;
    await db.resultStore.deleteResult(id);
    const results = await db.resultStore.getAllResults();
    assert.equal(results.length, testTrails.length - 1);
    const deletedResult = await db.resultStore.getResultById(id);
    assert.isNull(deletedResult);
  });

  test("get a trail - bad params", async () => {
    assert.isNull(await db.resultStore.getResultById(""));
    assert.isNull(await db.resultStore.getResultById());
  });

  test("delete One User - fail", async () => {
    await db.resultStore.deleteResult("bad-id");
    const results = await db.resultStore.getAllResults();
    assert.equal(results.length, testTrails.length);
  });
});