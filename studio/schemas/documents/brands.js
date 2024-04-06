import { FaRegBuilding } from 'react-icons/fa'
import generateSlug from '../utils/generateSlug'

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
      validation: Rule =>Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        slugify: input => generateSlug(input)
      }
    },
    {
      name: 'logo',
      type: 'basicImage',
      title: 'Logo Image',
      validation: Rule =>Rule.required()
    },
    {
      name: 'website',
      type: 'url',
      title: 'Website',
      validation: Rule =>Rule.required()
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO',
    },
    {
      name: 'review',
      type: 'review',
      title: 'Review',
    },
    {
      name: 'banner',
      type: 'mainImage',
      title: 'Banner Image',
      validation: Rule =>Rule.required()
    },
    {
      name: 'oneLiner',
      type: 'string',
      title: 'One-liner',
      validation: Rule =>Rule.required().max(50).error('A one-liner of max 50 characters is required'),
    },
    {
      name: 'ourDescription',
      type: 'bodyPortableText',
      title: 'Our Description',
      // validation: Rule =>Rule.required()
    },
    {
      name: 'theirDescription',
      type: 'bodyPortableText',
      title: 'Their Description',
      // validation: Rule =>Rule.required()
    },
    {
      name: 'showProducts',
      type: 'boolean',
      title: 'Show Products',
      validation: Rule =>Rule.required()
    },
  ],
  initialValue: {
    showProducts: false
  }
}
