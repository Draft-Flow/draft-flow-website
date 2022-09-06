import { FaTags } from "react-icons/fa";

export default {
  name: 'category',
  type: 'document',
  icon: FaTags,
  title: 'Categories',
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
        maxLength: 96,
      },
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
  ],
}
