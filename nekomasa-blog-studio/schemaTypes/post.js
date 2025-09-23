export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      options: {
        rows: 2
      }
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        calendarTodayLabel: 'Today'
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'dajareLevel',
      title: 'ダジャレベル',
      type: 'number',
      description: 'この記事のダジャレのレベルを5段階で評価します。',
      options: {
        list: [
          {title: '設定なし', value: 0},
          {title: '★☆☆☆☆', value: 1},
          {title: '★★☆☆☆', value: 2},
          {title: '★★★☆☆', value: 3},
          {title: '★★★★☆', value: 4},
          {title: '★★★★★', value: 5},
        ],
        layout: 'radio'
      },
    },
    {
      name: 'gorioshiLevel',
      title: '熱苦しさ',
      type: 'number',
      description: 'この記事の熱苦しさを5段階で評価します。',
      options: {
        list: [
          {title: '設定なし', value: 0},
          {title: '★☆☆☆☆', value: 1},
          {title: '★★☆☆☆', value: 2},
          {title: '★★★☆☆', value: 3},
          {title: '★★★★☆', value: 4},
          {title: '★★★★★', value: 5},
        ],
        layout: 'radio'
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block', options: {rows: 27}}, {type: 'image'}, {type: 'affiliate'}],
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
    },
  ],
}