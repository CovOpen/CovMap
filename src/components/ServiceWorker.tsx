import { useEffect } from "react";
import { createClient } from "clerk-sw/client";

export type ServiceWorkerProps = {
  swPath?: string;
  prefix?: string;
};

let client;

export const ServiceWorker = ({ swPath = "/sw.js", prefix = "react-plugin-clerk" }: ServiceWorkerProps) => {
  useEffect(() => {
    if (!client) {
      client = createClient({
        swPath,
        prefix,
      });
      client.on("waiting", (updateNow) => updateNow());
      client.registerServiceWorker();
    }
  }, []);
  return null;
};
