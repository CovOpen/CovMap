import { Config } from "./testcafe.config";
import { finishIntroScreens } from "./pages/Intro";

fixture`Intro screens test`.page`${Config.baseUrl}`;

test("Finish intro screens", async () => {
  await finishIntroScreens();
});
