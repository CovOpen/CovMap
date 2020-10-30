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

    // open panel for risk description
    var riskButton = Selector('button').withAttribute("aria-label", "show more").withAttribute("aria-expanded","false")
    await t.expect(riskButton.exists).ok();
    const websiteText = Selector("html").textContent;
    await t.click(riskButton).expect(websiteText).contains("Kontaktverhalten der Bevölkerung");

    // close panel for risk description
    var closeRiskButton = Selector('button').withAttribute("aria-label", "show more").withAttribute("aria-expanded","true")
    // console.log("close button"+(await closeRiskButton.textContent) + " " + closeRiskButton.count);
    await t.expect(closeRiskButton.exists).ok();
    // need to access the second element for closing.
    await t.click(closeRiskButton.nth(1)).expect(websiteText).notContains("Kontaktverhalten der Bevölkerung");;

    await t.wait(1000);
});
