import { Selector } from "testcafe";

const anythingSelector = Selector(() => {
  return document.querySelectorAll("*");
});

// This should work with text inside a Material-UI <Typography>
export function textExists(titleForIntro1: string) {
  return Selector(anythingSelector).withText(titleForIntro1).exists;
}
