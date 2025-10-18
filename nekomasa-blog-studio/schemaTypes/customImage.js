export default {
  name: 'customImage',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessibility.',
      validation: Rule => Rule.error('Alternative text is required').required(),
    },
    {
      name: 'width',
      type: 'number',
      title: 'Width (pixels)',
      description: 'Optional: Set a custom width for the image.',
    },
    {
      name: 'height',
      type: 'number',
      title: 'Height (pixels)',
      description: 'Optional: Set a custom height for the image.',
    },
  ],
  preview: {
    select: { title: 'alt', media: 'asset' },
  },
};
