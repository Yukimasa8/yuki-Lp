
export default {
  name: 'affiliate',
  title: 'Affiliate Link',
  type: 'object',
  fields: [
    {
      name: 'code',
      title: 'Affiliate Code',
      description: 'Paste the HTML code for the affiliate link here.',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'code',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: 'Affiliate Link',
        subtitle: title.substring(0, 100) + '...',
      }
    },
  },
}
