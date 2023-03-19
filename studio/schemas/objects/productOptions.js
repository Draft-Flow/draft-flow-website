export default {
  name: 'productOptions',
  type: 'object',
  title: 'Options',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule =>Rule.required()
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [{type: 'basicImage'}],
      validation: Rule =>Rule.required().min(1)
    },
    {
      name: 'skus',
      type: 'array',
      title: 'Skus',
      of: [{type: 'sku'}],
      validation: Rule =>Rule.required().min(1)
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images.0.asset',
    }
  },
}
