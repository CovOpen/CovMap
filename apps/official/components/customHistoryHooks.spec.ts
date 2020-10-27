import { getChangedQueryString } from "./customHistoryHooks";

describe("customHistoryHooks", () => {
  describe("getChangedQueryString", () => {
    it("should add an entry to an empty search", () => {
      const result = getChangedQueryString("?", { newKey: "something" });

      expect(result).toEqual("newKey=something");
    });

    it("should add a second entry to a search", () => {
      const result = getChangedQueryString("?first=entry", { newKey: "something" });

      expect(result).toEqual("first=entry&newKey=something");
    });

    it("should remove an entry from a search", () => {
      const result = getChangedQueryString("?some=thing&another=thing", { some: undefined });

      expect(result).toEqual("another=thing");
    });
  });
});
