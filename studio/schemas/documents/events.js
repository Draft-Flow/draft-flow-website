import { FaCalendarDay } from 'react-icons/fa'
import generateSlug from '../utils/generateSlug'

export default {
  name: 'events',
  type: 'document',
  icon: FaCalendarDay,
  title: 'Events',
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
        slugify: input => generateSlug(input)
      }
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price',
      description: 'Cost for the course',
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
      name: 'dates',
      type: 'array',
      title: 'Dates',
      options: {
        sortable: true
      },
      of: [
        {
          name: 'courseDate',
          type: 'object',
          icon: FaCalendarDay,
          fields: [
            {
              name: 'startDate',
              type: 'datetime',
              title: 'Start Date',
            },
            {
              name: 'endDate',
              type: 'datetime',
              title: 'End Date',
            }
          ],
          preview: {
            select: {
              startDate: 'startDate',
              endDate: 'endDate'
            },
            prepare(selection) {
              const {startDate, endDate} = selection
              return {
                title: new Date(startDate).toDateString(),
                subtitle: `${new Date(startDate).toLocaleTimeString()} - ${new Date(endDate).toLocaleTimeString()}`
              }
            }
          }
        }
      ]
    },
    {
      name: 'content',
      type: 'bodyPortableText',
      title: 'Content',
    }
  ],
}
