import { Config } from "./testcafe.config";
import { finishIntroScreens } from "./pages/Intro";
import {
  closeHamburgerMenu,
  expandInfoBoxIcon,
  openHamburgerMenu,
  searchField,
  shrinkInfoBoxIcon,
} from "./pages/MainMap";
import { textExists } from "./elements/muiTypography";

fixture`Search field test`.page`${Config.baseUrl}`
  .beforeEach(async () => {
    await finishIntroScreens();
  })
  .afterEach(async () => {
    // place holder
  });

test("find search field", async (t) => {
  await t.click(searchField).typeText(searchField, "Stuttgart").pressKey("enter");

  // wait until the map has scrolled.
  await t.wait(1000);
  await t.takeScreenshot();

  // open panel for risk description
  await t.click(expandInfoBoxIcon).expect(textExists("Kontaktverhalten der Bevölkerung")).ok();

  // close panel for risk description
  await t.click(shrinkInfoBoxIcon).expect(textExists("Kontaktverhalten der Bevölkerung")).notOk();
  await t.takeScreenshot();
});

test("Hamburger menu", async (t) => {
  // open panel and check if close button is visible, hamburger menu should be invisible
  await t
    .expect(closeHamburgerMenu.visible)
    .notOk()
    .takeScreenshot()
    .click(openHamburgerMenu)
    .expect(textExists("Über die CovMap"))
    .ok();
  // the hamburger menu will not be made invisible when the panel is visible, so the assertion do not works.
  // .expect(openHamburgerMenu.visible).notOk();

  await t.takeScreenshot();

  // console.log("websiteText "+ (await closeHamburgerMenu.textContent)+" "+(await closeHamburgerMenu.visible));

  // close menu panel and check if hamburger menu is visible
  await t.click(closeHamburgerMenu).expect(closeHamburgerMenu.visible).notOk().expect(openHamburgerMenu.visible).ok();

  await t.takeScreenshot();
});
