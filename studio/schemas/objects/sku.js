export default {
  name: 'sku',
  type: 'object',
  title: 'SKU',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule =>Rule.required()
    },
    {
      name: 'partNumber',
      type: 'string',
      title: 'Part #',
      validation: Rule =>Rule.required()
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price',
      validation: Rule => Rule.required()
    },
  ],
}
