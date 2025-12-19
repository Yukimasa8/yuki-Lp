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

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
