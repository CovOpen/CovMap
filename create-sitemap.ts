import { sitemapBuilder as buildSitemap } from "react-router-sitemap";

var fs = require("fs");

const regex = /pages: (\[[\w\W]+?\])/gm;

let source = regex.exec(fs.readFileSync("./apps/official/index.ts").toString())[1];
//console.log(source);

let ignorePaths = ["questions"];
let pathPrefix = "/#/";

var paths = source
  .split(",")
  .map((x) => x.split(":").map((y) => y.trim()))
  .reduce((a, x) => {
    if (x[0] == "route") {
      let route = x[1].replace(/["'/]/g, "");
      if (ignorePaths.findIndex((p) => route === p) == -1) {
        a.push(pathPrefix + route);
      }
    }
    return a;
  }, []);

const hostname = "https://www.covmap.de";
const sitemap = buildSitemap(hostname, paths);
console.log(sitemap);

const { createWriteStream } = require("fs");
const { SitemapStream } = require("sitemap");

// Creates a sitemap object given the input configuration with URLs
const sitemapSteam = new SitemapStream(sitemap);

const writeStream = createWriteStream("./static/sitemap.xml");
sitemapSteam.pipe(writeStream);
paths.forEach((path) => {
  sitemapSteam.write(path);
});

sitemapSteam.end();
