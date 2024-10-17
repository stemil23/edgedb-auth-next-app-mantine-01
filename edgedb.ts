import { createHttpClient } from "edgedb";
import createAuth from "@edgedb/auth-nextjs/app";

import { getBaseUrl } from "./base-url";

export const client = createHttpClient({
  tlsSecurity: process.env.NODE_ENV === "production" ? "default" : "insecure",
});

export const auth = createAuth(client, {
  baseUrl: getBaseUrl(),
});