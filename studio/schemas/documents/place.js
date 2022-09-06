import { FaMapMarkerAlt } from 'react-icons/fa'

export default {
  name: 'place',
  type: 'document',
  icon: FaMapMarkerAlt,
  title: 'Places',
  groups: [
    {
      name: 'supporter',
      title: 'Supporter',
    },
  ],
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        'Some frontends will require a slug to be set to be able to show the person',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'type',
      type: 'array',
      title: 'Type',
      layout: 'tags',
      of: [{ type: 'placeTypeReference' }],
      validation: (Rule) => Rule.min(1),
    },
    {
      name: 'supporter',
      type: 'object',
      group: ['supporter'],
      fields: [
        {
          name: 'isSupporter',
          type: 'boolean',
          title: 'Supporter',
          description: 'Is this place a paying supporter of Perthshire Gravel?',
        },
        {
          name: 'expiration',
          type: 'date',
          title: 'Supporter Expiration',
          hidden: ({ document }) => !document?.supporter.isSupporter,
        },
        {
          name: 'logo',
          type: 'logoImage',
          title: 'Supporter Logo',
          hidden: ({ document }) => !document?.supporter.isSupporter,
        },
      ],
    },
    {
      name: 'website',
      type: 'url',
      title: 'Website URL',
    },
    {
      name: 'location',
      type: 'geopoint',
      title: 'Location',
    },
    {
      name: 'description',
      type: 'bodyPortableText',
      title: 'Description',
    },
  ],
  preview: {
    select: {
      title: 'name',
      supporter: 'supporter',
      image: 'type.0.placeType.icon',
    },
    prepare: ({ title, supporter, image }) => {
      const subtitle = supporter ? 'Supporter' : ''

      return {
        title,
        subtitle,
        media: image,
      }
    },
  },
}
