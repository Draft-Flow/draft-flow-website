import { FaShoppingCart } from 'react-icons/fa'

export default {
  name: 'shop',
  type: 'document',
  icon: FaShoppingCart,
  title: 'Shop',
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
      name: 'seo',
      type: 'seo',
      title: 'SEO',
    },
    {
      name: 'oneLiner',
      type: 'string',
      title: 'One-Liner',
      validation: Rule =>Rule.required().max(50).error('A one-liner of max 50 characters is required')
    },
    {
      title: 'Brand',
      name: 'brand',
      type: 'reference',
      to: [{type: 'brand'}]
    },
    {
      title: 'Category',
      name: 'category',
      type: 'reference',
      to: [{type: 'category'}],
      options: {filter: 'defined(parent)'},
    },
    {
      name: 'banner',
      type: 'mainImage',
      title: 'Banner Image',
      validation: Rule =>Rule.required()
    },
    {
      name: 'content',
      type: 'bodyPortableText',
      title: 'Content',
    },
    {
      name: 'options',
      type: 'array',
      title: 'Options',
      of: [{type: 'productOptions'}]
    },
  ],
  preview: {
    select: {
      name: 'name',
      brand: 'brand.name',
      category: 'category.parent.title'
    },
    prepare(selection) {
      const {name, brand, category} = selection
      return {
        title: name,
        subtitle: `${brand} - ${category}`
      }
    }
  }
}
