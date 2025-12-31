import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = 'xm3dmjar';
const dataset = 'production';
const apiVersion = '2023-05-03';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // `false` if you want to ensure fresh data
});

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Write operations should not use CDN
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
