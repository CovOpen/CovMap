import { Config } from "./testcafe.config";
import { buttonWithText, textExists } from "./testUtils";

fixture`Intro screens test`.page`${Config.baseUrl}`;

test("Finish intro screens", async (t) => {
  const nextButton = buttonWithText("Weiter");

  const titleForIntro1 = "Willkommen bei der CovMap";
  const titleForIntro2 = "Was ist die CovMap?";
  const titleForIntro3 = "Was zeigt mir die CovMap an?";
  const titleTextForPostalCode = "Für Dein regionales Risiko brauchen wir noch die Postleitzahl Deines Wohnortes";

  await t.takeScreenshot();

  await t.expect(textExists(titleForIntro1)).ok();
  await t.click(nextButton);

  await t.takeScreenshot();
  await t.expect(textExists(titleForIntro2)).ok();
  await t.click(nextButton);

  await t.takeScreenshot();
  await t.expect(textExists(titleForIntro3)).ok();
  await t.click(nextButton);

  await t.takeScreenshot();
  await t.expect(textExists(titleTextForPostalCode)).ok();
  await t.pressKey("1 2 3 4 5 tab space tab tab enter");

  await t.takeScreenshot();
  await t.expect(textExists(titleTextForPostalCode)).notOk();
});
