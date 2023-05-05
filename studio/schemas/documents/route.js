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
  ],
  fields: [
    // Basics
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      group: ['basics'],
      validation: Rule =>Rule.required()
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
      validation: Rule =>Rule.required()
    },
    // Description
    {
      name: 'website',
      type: 'url',
      title: 'Website',
      group: ['basics'],
    },
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
    {
      name: 'area',
      type: 'file',
      title: 'Area',
      description:
        'A GeoJSON file for the area of the place.',
    },
    // Paths
    {
      name: 'paths',
      type: 'array',
      title: 'Paths',
      of: [{type: 'path'}],
      group: ['gpx'],
      validation: Rule =>Rule.required().min(1)
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
