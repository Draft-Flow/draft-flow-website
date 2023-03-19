const generateUUID = (attrs) =>  {
  const size = attrs.find(attr => attr.startsWith("size:")).replace("size:", "")
  const color = attrs.find(attr => attr.startsWith("color:")).replace("color:", "")
  const tubeless = attrs.find(attr => attr === 'tubeless')

  const fields = [
    size, color
  ]

  if (tubeless) {fields.push(tubeless)}

  return fields.join('-')
}

export default {
  name: 'sku',
  type: 'object',
  title: 'SKU',
  fields: [
    {
      name: 'partNumber',
      type: 'string',
      title: 'Part #',
      validation: Rule =>Rule.required()
    },
    {
      name: 'attributes',
      type: 'array',
      title: 'Attributes',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      validation: Rule =>Rule.required()
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'partNumber',
      attributes: 'attributes'
    },
    prepare(selection) {
      const {title, attributes} = selection
      return {
        title,
        subtitle: generateUUID(attributes)
      }
    }
  },
}
