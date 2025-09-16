import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'nekomasa-blog-studio',

  projectId: 'xm3dmjar',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Post')
              .child(S.documentTypeList('post').title('Post')),
            S.listItem()
              .title('Author')
              .child(S.documentTypeList('author').title('Author')),
            S.listItem()
              .title('Category')
              .child(S.documentTypeList('category').title('Category')),
            S.listItem()
              .title('Affiliate')
              .child(S.documentTypeList('affiliate').title('Affiliate')),
            S.listItem()
              .title('Tag')
              .child(S.documentTypeList('tag').title('Tag')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
