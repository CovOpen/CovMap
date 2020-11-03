import { Config } from "./testcafe.config";
import { regexpExists } from "./elements/textElement";

fixture`Incompatible browsers test`.page`${Config.baseUrl}`;

test("Should show unsupported warning", async (t) => {
  await t.expect(regexpExists(/Dieser Browser wird nicht unterstützt/)).ok();
});
