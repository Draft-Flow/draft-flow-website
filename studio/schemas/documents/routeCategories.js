import { FaTags } from 'react-icons/fa'

export default {
  name: 'routeCategory',
  type: 'document',
  icon: FaTags,
  title: 'Route Categories',
  fields: [
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
  ],
}
