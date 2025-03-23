import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { runriotService } from "./runriot-service.js";
import { aoife, greenway, testTrails, testResults, testresult } from "../fixtures.js";

suite("Result API tests", () => {
  let user = null;
  let parkRun = null;

  setup(async () => {
    runriotService.clearAuth();
    user = await runriotService.createUser(aoife);
    await runriotService.authenticate(aoife);
    await runriotService.deleteAllTrails();
    await runriotService.deleteAllResults();
    await runriotService.deleteAllUsers();
    user = await runriotService.createUser(aoife);
    await runriotService.authenticate(aoife);
    greenway.userid = user._id;
    parkRun = await runriotService.createTrail(greenway);
  });

  teardown(async () => {});

  test("create result", async () => {
    const returnedResult = await runriotService.createResult(parkRun._id, testresult);
    console.log("Returned Result:", returnedResult);
    assertSubset(testresult, returnedResult);
  });

  test("create Multiple results", async () => {
    for (let i = 0; i < testResults.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await runriotService.createResult(parkRun._id, testResults[i]);
    }
    const returnedResults = await runriotService.getAllResults();
    assert.equal(returnedResults.length, testResults.length);
    for (let i = 0; i < returnedResults.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const result = await runriotService.getResult(returnedResults[i]._id);
      assertSubset(result, returnedResults[i]);
    }
  });

  test("Delete ResultApi", async () => {
    for (let i = 0; i < testResults.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await runriotService.createResult(parkRun._id, testResults[i]);
    }
    let returnedResults = await runriotService.getAllResults();
    assert.equal(returnedResults.length, testResults.length);
    for (let i = 0; i < returnedResults.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const result = await runriotService.deleteResult(returnedResults[i]._id);
    }
    returnedResults = await runriotService.getAllResults();
    assert.equal(returnedResults.length, 0);
  });

  test("denormalised trail", async () => {
    for (let i = 0; i < testResults.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await runriotService.createResult(parkRun._id, testResults[i]);
    }
    const returnedTrail = await runriotService.getTrail(parkRun._id);
    assert.equal(returnedTrail.results.length, testResults.length);
    for (let i = 0; i < testResults.length; i += 1) {
      assertSubset(testResults[i], returnedTrail.results[i]);
    }
  });
});