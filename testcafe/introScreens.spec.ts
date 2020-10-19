import { Selector } from "testcafe";
import { Config } from "./testcafe.config";

fixture`Intro screens test`.page`${Config.baseUrl}`;

test("Finish intro screens", async (t) => {
  const nextButton = Selector("a").withAttribute("role", "button").child().withText("Weiter");
  const websiteText = Selector("html").textContent;

  const titleForIntro1 = "Willkommen bei der CovMap";
  const titleForIntro2 = "Was ist die CovMap?";
  const titleForIntro3 = "Was zeigt mir die CovMap an?";
  const titleTextForPostalCode = "Für Dein regionales Risiko brauchen wir noch die Postleitzahl Deines Wohnortes";

  await t.expect(websiteText).contains(titleForIntro1).click(nextButton);

  await t.expect(websiteText).contains(titleForIntro2).click(nextButton);

  await t.expect(websiteText).contains(titleForIntro3).click(nextButton);

  await t.expect(websiteText).contains(titleTextForPostalCode).pressKey("1 2 3 4 5 enter");

  await t.expect(websiteText).notContains(titleTextForPostalCode);
});
