import { FaRegBuilding } from 'react-icons/fa'

export default {
  name: 'brand',
  type: 'document',
  icon: FaRegBuilding,
  title: 'Brands',
  __experimental_actions: ['update', 'create', 'delete', 'publish'],
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 200)
      }
    },
    {
      name: 'logo',
      type: 'basicImage',
      title: 'Logo Image',
    },
    {
      name: 'website',
      type: 'url',
      title: 'Website',
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO',
    },
    {
      name: 'content',
      type: 'bodyPortableText',
      title: 'Content',
    },
  ],
}
