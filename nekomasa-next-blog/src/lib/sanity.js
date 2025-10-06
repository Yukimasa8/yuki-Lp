import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'xm3dmjar',
  dataset: 'production',
  apiVersion: '2023-05-03', // use a UTC date string
  useCdn: true, // set to `false` to bypass the edge cache
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}