import { Selector } from "testcafe";

// This should work with the label of a Material-UI <Button>
export function buttonWithText(nextButtonText: string) {
  return Selector("a").withAttribute("role", "button").child().withText(nextButtonText);
}
