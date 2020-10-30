import { Selector } from "testcafe";
import { Config } from "./testcafe.config";

fixture`Search field test`.page`${Config.baseTestCovmapUrl}`
    .beforeEach( async t => {
        const nextButton = Selector("a").withAttribute("role", "button").child().withText("Weiter");
        const websiteText = Selector("html").textContent;
        const titleForIntro1 = "Willkommen bei der CovMap";
        const titleForIntro2 = "Was ist die CovMap?";
        const titleForIntro3 = "Was zeigt mir die CovMap an?";
        const titleTextForPostalCode = "Für Dein regionales Risiko brauchen wir noch die Postleitzahl Deines Wohnortes";
        
        await t.expect(websiteText).contains(titleForIntro1).click(nextButton);
        await t.expect(websiteText).contains(titleForIntro2).click(nextButton);
        await t.expect(websiteText).contains(titleForIntro3).click(nextButton);
        await t.expect(websiteText).contains(titleTextForPostalCode).pressKey("1 0 1 1 5 tab space tab tab enter");
        await t.expect(websiteText).notContains(titleTextForPostalCode);
    })
    .afterEach( async t => {
        // place holder
    });

test("find search field", async (t) => {
    var searchField = Selector('#autocomplete').withAttribute("placeholder", "PLZ oder Landkreis")
    await t.expect(searchField.exists).ok();
    await t.click(searchField).typeText(searchField, "Stuttgart").pressKey("enter");
    await t.wait(5000);
});
