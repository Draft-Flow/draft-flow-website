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
      validation: rule=>rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        slugify: input => generateSlug(input)
      },
      validation: rule=>rule.required()
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price',
      description: 'Cost for the course',
      validation: rule=>rule.required()
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
              name: 'available',
              type: 'number',
              title: 'Spots Available',
              validation: rule=>rule.required().max(25)
            },
            {
              name: 'startDate',
              type: 'datetime',
              title: 'Start Date',
              validation: rule=>rule.required().min(new Date().toISOString()),
              options: {
                timeStep: 15
              }
            },
            {
              name: 'endDate',
              type: 'datetime',
              title: 'End Date',
              validation: rule => rule.required().min(rule.valueOfField('startDate')),
              options: {
                timeStep: 15
              }
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
      name: 'intro',
      type: 'text',
      title: 'Intro',
      validation: rule=>rule.required()
    },
    {
      name: 'content',
      type: 'bodyPortableText',
      title: 'Content',
      validation: rule=>rule.required()
    }
  ],
}
