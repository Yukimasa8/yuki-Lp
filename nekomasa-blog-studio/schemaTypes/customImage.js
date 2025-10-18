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
    },
    {
      name: 'size',
      type: 'string',
      title: 'Image Size',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
        layout: 'radio', // Display as radio buttons
      },
      initialValue: 'medium', // Default to medium
      description: 'Select the display size for the image.',
    },
  ],
  preview: {
    select: { title: 'alt', media: 'asset' },
  },
};
