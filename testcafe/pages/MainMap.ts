import { Selector } from "testcafe";

export const searchField = Selector("#autocomplete").withAttribute("placeholder", "PLZ oder Landkreis");

export const expandInfoBoxIcon = Selector("button")
  .withAttribute("aria-label", "show more")
  .withAttribute("aria-expanded", "false");
export const shrinkInfoBoxIcon = Selector("button")
  .withAttribute("aria-label", "show more")
  .withAttribute("aria-expanded", "true");

export const openHamburgerMenu = Selector("button")
  .withAttribute("aria-label", "Main Menu")
  .withAttribute("aria-controls", "menu-appbar");
export const closeHamburgerMenu = Selector("button")
  .withAttribute("aria-label", "Close Main Menu")
  .withAttribute("aria-controls", "menu-appbar");
