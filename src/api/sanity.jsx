import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_PROJECT_ID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-01-12",
  token: import.meta.env.VITE_API_KEY,
});
