export default {
  name: 'place',
  type: 'document',
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
      title: 'Name'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the person',
      options: {
        source: 'name',
        maxLength: 96
      }
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
          hidden: ({document}) => !document?.supporter.isSupporter,
        },
        {
          name: 'logo',
          type: 'logoImage',
          title: 'Supporter Logo',
          hidden: ({document}) => !document?.supporter.isSupporter,
        },
      ]
    },
    {
      name: 'website',
      type: 'url',
      title: 'Website URL',
    },
    {
      name: 'location',
      type: 'geopoint',
      title: 'Location'
    },
    {
      name: 'description',
      type: 'bodyPortableText',
      title: 'Description'
    }
  ],
  preview: {
    select: {
      title: 'name',
      supporter: 'supporter'
    },
    prepare: ({title, supporter}) => {
      const subtitle = supporter ? 'Supporter' : ''

      return {
        title,
        subtitle
      }
    }
  }
}