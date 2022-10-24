import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list'
import { FaTags } from 'react-icons/fa'

export default {
  name: 'category',
  type: 'document',
  orderings: [orderRankOrdering],
  icon: FaTags,
  title: 'Categories',
  fields: [
    orderRankField({ type: 'category' }),
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'color',
      type: 'color',
      title: 'Color',
      options: {
        disableAlpha: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      type: 'text',
      rows: 2,
      title: 'Excerpt',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule) => Rule.required(),
    },
  ],
}
