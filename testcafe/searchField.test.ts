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
        await t.expect(websiteText).contains(titleTextForPostalCode).pressKey("1 2 3 4 5 tab space tab tab enter");
        await t.expect(websiteText).notContains(titleTextForPostalCode);
    })
    .afterEach( async t => {
        // place holder
    });

test("find search field", async (t) => {
    // .expect(locate.with({visibilityCheck : true}).exists)
    await t.expect({ placeholder: 'PLZ oder Landkreis', visibilityCheck: true })
        .contains({ placeholder: 'PLZ oder Landkreis', visibilityCheck: true }, 'textfield for search not found')
        .pressKey("5 4 3 2 1 enter");
    await t.wait(5000);

    
});
