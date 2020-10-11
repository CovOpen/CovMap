/* global  __precacheManifest */
import { Clerk } from "clerk-sw/worker";
import { IDBWorkerPlugin } from "clerk-plugin-idb/src/worker";

Clerk.use(new IDBWorkerPlugin());

const version = "0.4.0";
const env = process.env.SW_ENV || process.env.NODE_ENV;
const defaultStrategy = "network-first";
const dataCacheName = "covmap-data";
const assetCacheName = "covmap-assets";

// TODO: Add refetchOnInstall
const routes = [
  {
    test: /\.css|\.js|\/manifest\.json/,
    maxAge: 24 * 60 * 60,
    cacheName: assetCacheName,
    purgeOnActivation: true,
  },
  {
    test: /\/index\.html|\/$/,
    cacheName: assetCacheName,
    purgeOnActivation: true,
    // Rewrite in cacheKeyRequest to all use the same ..host../index.html and cache it only once
    cacheKeyRequest: (req) => {
      const url = req.url.split("/").slice(0, 3).concat("index.html").join("/");
      return new Request(url, {
        method: "GET",
        referrer: req.referrer,
      });
    },
  },
  {
    test: /\/data/,
    maxAge: 30 * 24 * 60 * 60,
    cacheName: dataCacheName,
  },
  {
    test: /[a-z0-9\-\/]{1,}\.(svg|png|ico|gif|otf|woff)/,
    cacheName: assetCacheName,
    maxAge: 24 * 60 * 60,
  },
];

const clerk = new Clerk({
  env,
  color: env !== "production",
  defaultStrategy,
  defaultCacheName: "covmap-clerk-cache-2",
  logCacheName: "covmap-clerk-log",
  idbName: "covmap-clerk-default-db",
  routes: routes,
  info: {
    version,
    dataCacheName,
  },
  // TODO: rename addPrecache to precache and hand over __precacheManifest there
  precache: __precacheManifest,
});

clerk.logger.namespace(`[covmap ${version}]`, env !== "production");
