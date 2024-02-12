import { FaRegNewspaper } from 'react-icons/fa'

export default {
  name: 'news',
  type: 'document',
  icon: FaRegNewspaper,
  title: 'News',
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
      name: 'cta',
      type: 'object',
      title: 'Call to Action',
      fields: [
        {
          name: 'title',
          type: 'text',
          rows: 1,
        },
        {
          name: 'text',
          type: 'excerptPortableText',
        },
        {
          name: 'buttonText',
          type: 'text',
          rows: 1,
        },
        {
          name: 'buttonLink',
          type: 'url',
          rows: 1,
        },
      ],
    },
    {
      name: 'content',
      type: 'bodyPortableText',
      title: 'Content',
    },
  ],
}
