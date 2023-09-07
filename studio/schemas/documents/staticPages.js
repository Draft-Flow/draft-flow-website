import { FaFile } from 'react-icons/fa'

export default {
  name: 'staticPages',
  type: 'document',
  icon: FaFile,
  title: 'Static Pages',
  __experimental_actions: ['update', 'create', 'delete', 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 200)
      }
    },
    {
      name: 'layout',
      type: 'string',
      title: 'Layout',
      options: {
        list: [
          {title: 'Sci-Fi', value: 'sci-fi'},
          {title: 'Western', value: 'western'}
        ]
      }
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO',
    },
    {
      name: 'banner',
      type: 'image',
      title: 'Banner Image',
      description: 'Banner image for the page',
    },
    {
      name: 'content',
      type: 'bodyPortableText',
      title: 'Content',
    },
  ],
}
