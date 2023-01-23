import { FaRoute } from 'react-icons/fa'

export default {
  name: 'route',
  type: 'document',
  icon: FaRoute,
  title: 'Routes',
  initialValue: {
    sameFinish: true,
  },
  groups: [
    {
      name: 'basics',
      title: 'Basics',
    },
    {
      name: 'description',
      title: 'Description',
    },
    {
      name: 'gpx',
      title: 'GPX',
    },
    {
      name: 'beta',
      title: 'Beta',
    },
    {
      name: 'stages',
      title: 'Stages',
    },
  ],
  fields: [
    // Basics
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      group: ['basics'],
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        'Some frontends will require a slug to be set to be able to show the post',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: ['basics'],
    },
    {
      name: 'publishedAt',
      type: 'date',
      title: 'Published at',
      description: 'This can be used to schedule post for publishing',
      group: ['beta'],
    },
    // Description
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Main image',
      group: ['description'],
    },
    {
      name: 'excerpt',
      type: 'excerptPortableText',
      title: 'Excerpt',
      description:
        'This ends up on summary pages, on Google, when people share your post in social media.',
      group: ['description'],
    },
    {
      name: 'body',
      type: 'bodyPortableText',
      title: 'Body',
      group: ['description'],
    },
    // GPX
    {
      name: 'gpxRoute',
      type: 'file',
      title: 'GPX Route',
      description:
        'A GPX of the route. Please ensure the GPX route contains elevation data.',
      group: ['gpx'],
    },
    // Beta
    {
      name: 'terrain',
      type: 'text',
      title: 'Terrain',
      rows: 2,
      description: 'A description of the riding surfaces.',
      group: ['beta'],
    },
    {
      name: 'facilities',
      type: 'text',
      title: 'Facilities',
      rows: 2,
      description:
        'A short description of the facilities located along the route.',
      group: ['beta'],
    },
    {
      name: 'keyPoints',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Key Points',
      description: 'Other useful knowledge for the route, 1 per line.',
      group: ['beta'],
    },
    {
      name: 'time',
      type: 'string',
      title: 'Riding Time',
      description: 'Estimated time to ride in hours. Ex "3-4 hrs"',
      group: ['beta'],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'osgridref',
      type: 'string',
      title: 'OS Grid Reference number',
      description: 'The Open Street grid reference number',
      validation: (Rule) =>
        Rule.optional().custom((value) => {
          const regex =
            /^([STNHOstnho][A-Za-z]\s?)(\d{5}\s?\d{5}|\d{4}\s?\d{4}|\d{3}\s?\d{3}|\d{2}\s?\d{2}|\d{1}\s?\d{1})$/
          return value.match(regex)
            ? true
            : 'Must be a valid OS Grid Reference number'
        }),
      group: ['beta'],
    },
    {
      name: 'oslandrangermap',
      type: 'array',
      title: 'OS Landranger Maps',
      description: 'The OS Landranger Map numbers. ',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      validation: (Rule) =>
        Rule.optional().custom((values) => {
          const regex = /[0-9]{1,3}/
          return values.every((value) => value.match(regex))
            ? true
            : 'Must be valid map numbers'
        }),
      group: ['beta'],
    },

    {
      name: 'sameFinish',
      type: 'boolean',
      title: 'Is the finish the same as the start? ',
      description: 'Does the route start and end at the same point?',
      initialValue: true,
      group: ['beta'],
    },
    // Stages
    {
      name: 'stages',
      type: 'array',
      title: 'Stages',
      description: 'Add stages to the route, if desired.',
      of: [
        {
          type: 'reference',
          to: {
            type: 'route',
          },
        },
      ],
      group: ['stages'],
    },
  ],
  orderings: [
    {
      name: 'distance',
      title: 'Route Length short->long',
      by: [
        {
          field: 'routeLength',
          direction: 'asc',
        },
        {
          field: 'title',
          direction: 'asc',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      rating: 'category.title',
      routeLength: 'routeLength',
      routeTime: 'time',
      routeAscent: 'routeAscent',
      media: 'mainImage',
    },
    prepare({ title = 'No title', routeTime = '', rating = '', media }) {
      const attrArr = [routeTime || null, rating || null]

      const attributes = attrArr.filter((n) => n)

      return {
        title,
        media,
        subtitle: attributes.length ? attributes.join(' | ') : null,
      }
    },
  },
}
