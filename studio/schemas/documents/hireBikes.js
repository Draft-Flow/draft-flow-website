import { FaBicycle } from 'react-icons/fa'
import generateSlug from '../utils/generateSlug'

export default {
  name: 'hireBikes',
  type: 'document',
  icon: FaBicycle,
  title: 'Hire Bikes',
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
      description: 'Cost per half-day',
      validation: rule=>rule.required()
    },
    {
      name: 'calendarID',
      type: 'string',
      title: 'Calendar ID',
      description: 'Google Calendar ID for this event',
      validation: rule=>rule.required()
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
