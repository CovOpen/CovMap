import percySnapshot from "@percy/testcafe";

export class Config {
  static baseUrl = "http://localhost:8080";
  static percySnapshot = (name, options) => {
    percySnapshot(name, {
      widths: [768, 992, 1200],
      ...options,
    });
  };
}
