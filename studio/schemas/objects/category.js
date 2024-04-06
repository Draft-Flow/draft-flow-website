import {FiTag} from 'react-icons/fi'
import generateSlug from '../utils/generateSlug'

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: FiTag,
  fields: [
    {
      name: 'parent',
      type: 'reference',
      to: [{type: 'category'}],
      hidden: ({document}) => !document?.parent,
      // This ensures we cannot select other "children"
      options: {
        filter: '!defined(parent)',
      },
    },
    {name: 'title', type: 'string'},
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      hidden: ({document}) => !document?.parent,
      options: {
        source: 'title',
        slugify: input => generateSlug(input),
        isUnique: async (slug, context) => {
          const {document, getClient} = context
          const client = getClient({apiVersion: '2022-12-07'})
          const id = document._id.replace(/^drafts\./, '')
          const params = {
            draft: `drafts.${id}`,
            published: id,
            parentRef: document.parent._ref,
            slug,
          }
          const query = `!defined(*[!(_id in [$draft, $published]) && _type == 'category' && parent._ref == $parentRef && slug.current == $slug][0]._id)`
          const result = await client.fetch(query, params)
          return result
        } 
      },
    },
    {
      name: 'banner',
      type: 'mainImage',
      title: 'Banner Image',
      validation: Rule =>Rule.required()
    },
    {
      name: 'description',
      type: 'bodyPortableText',
      title: 'Description'
    },
    {
      name: 'oneLiner',
      type: 'string',
      title: 'One-Liner'
    },
  ],
  // Customise the preview so parents are visualised in the studio
  preview: {
    select: {
      title: 'title',
      subtitle: 'parent.title',
    },
    prepare: ({title, subtitle}) => ({
      title,
      subtitle: subtitle ? `– ${subtitle}` : ``,
    }),
  },
}
