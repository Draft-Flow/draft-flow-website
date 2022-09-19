import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';
import { FaTags } from "react-icons/fa";

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
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'excerpt',
      type: 'text',
      rows: 2,
      title: 'Excerpt'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
  ],
}
