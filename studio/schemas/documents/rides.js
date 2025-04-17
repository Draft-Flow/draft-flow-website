import { FaCalendarDay } from 'react-icons/fa'
import generateSlug from '../utils/generateSlug'

export default {
  name: 'rides',
  type: 'document',
  icon: FaCalendarDay,
  title: 'Rides',
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
          name: 'rideDate',
          type: 'object',
          icon: FaCalendarDay,
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Location',
              validation: rule=>rule.required()
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              validation: rule=>rule.required()
            },
            {
              name: 'startDate',
              type: 'datetime',
              title: 'Start Date',
              validation: rule=>rule.required(),
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
            },
            {
              name: 'komootCollection',
              type: 'url',
              title: 'Komoot Collection',
              validation: rule => rule.required()
            },
            {
              name: 'location',
              type: 'geopoint',
              title: 'Location',
              validation: rule=>rule.required()
            },
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
      validation: rule=>rule.required()
    }
  ],
}
