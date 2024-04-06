import { FaShoppingCart } from 'react-icons/fa'
import generateSlug from '../utils/generateSlug'

export default {
  name: 'shop',
  type: 'document',
  icon: FaShoppingCart,
  title: 'Products',
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
      name: 'content',
      title: 'Content',
    },
    {
      name: 'options',
      title: 'Options',
    },
  ],
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      group: 'general'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        slugify: input => generateSlug(input)
      },
      group: 'general'
    },
    {
      title: 'Category',
      name: 'category',
      type: 'reference',
      to: [{type: 'category'}],
      options: {filter: 'defined(parent)'},
      group: 'general'
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    },
    {
      title: 'Brand',
      name: 'brand',
      type: 'reference',
      to: [{type: 'brand'}],
      group: 'content'
    },
    {
      name: 'banner',
      type: 'mainImage',
      title: 'Banner Image',
      validation: Rule =>Rule.required(),
      group: 'content'
    },
    {
      name: 'oneLiner',
      type: 'string',
      title: 'One-Liner',
      validation: Rule =>Rule.required().max(50).error('A one-liner of max 50 characters is required'),
      group: 'content'
    },
    {
      name: 'content',
      type: 'bodyPortableText',
      title: 'Content',
      group: 'content',
    },
    {
      name: 'options',
      type: 'array',
      title: 'Options',
      of: [{type: 'productOptions'}],
      group: 'options'
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
