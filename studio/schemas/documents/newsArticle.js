import { FaRegNewspaper } from 'react-icons/fa'
import generateSlug from '../utils/generateSlug'

export default {
  name: 'news',
  type: 'document',
  icon: FaRegNewspaper,
  title: 'News',
  __experimental_actions: ['update', 'create', 'delete', 'publish'],
  groups: [
    {
      name: 'general',
      title: 'General',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'banner',
      title: 'Banner',
    },
    {
      name: 'cta',
      title: 'CTA',
    },
    {
      name: 'content',
      title: 'Content',
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      group: 'general',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      group: 'general',
      options: {
        source: 'title',
        slugify: input => generateSlug(input)
      }
    },
    {
      name: 'seo',
      type: 'seo',
      group: 'seo',
      title: 'SEO',
    },
    {
      name: 'banner',
      type: 'image',
      title: 'Banner Image',
      group: 'banner',
      description: 'Banner image for the page',
    },
    {
      name: 'bannerText',
      type: 'object',
      title: 'Banner Text',
      group: 'banner',
      description: 'Use text instead of an image',
      fields: [
        {
          name: 'title',
          type: 'text',
          rows: 1,
        },
        {
          name: 'subtitle',
          type: 'text',
          rows: 1,
        },
      ]
    },
    {
      name: 'cta',
      type: 'object',
      group: 'cta',
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
      group: 'content',
    },
  ],
}
