import { assert } from "chai";
import { runriotService } from "./runriot-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { aoife, aoifeCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    runriotService.clearAuth();
    await runriotService.createUser(aoife);
    await runriotService.authenticate(aoifeCredentials);
    await runriotService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await runriotService.createUser(aoife);
    const response = await runriotService.authenticate(aoifeCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await runriotService.createUser(aoife);
    const response = await runriotService.authenticate(aoifeCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });
  
  test("check Unauthorized", async () => {
    runriotService.clearAuth();
    try {
      await runriotService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
