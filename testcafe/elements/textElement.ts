import { Selector } from "testcafe";

const anythingSelector = Selector(() => document.querySelectorAll("*"));

export function textExists(text: string) {
  return Selector(anythingSelector).withText(text).exists;
}

export function regexpExists(text: RegExp) {
  return Selector(anythingSelector).withText(text).exists;
}
