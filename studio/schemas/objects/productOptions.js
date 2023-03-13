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
      name: 'skus',
      type: 'array',
      title: 'Skus',
      of: [{type: 'sku'}],
      validation: Rule =>Rule.required().min(1)
    }
  ],
}
