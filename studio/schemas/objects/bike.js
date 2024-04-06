import generateSlug from '../utils/generateSlug'

export default {
  name: 'bike',
  type: 'object',
  title: 'Bike',
  fields: [
    {
      name: 'available',
      type: 'boolean',
      title: 'Available?',
      validation: Rule =>Rule.required()
    },
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule =>Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'bike.name',
        slugify: input => generateSlug(input)
      }
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'mainImage'
        }
      ],
    },
    {
      name: 'description',
      type: 'bodyPortableText',
      title: 'Description',
      validation: Rule =>Rule.required()
    },
  ]
}
