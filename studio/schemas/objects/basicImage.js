export default {
  name: 'basicImage',
  type: 'image',
  title: 'Image',
  description: 'Upload an image',
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessiblity.',
      validation: (Rule) =>
        Rule.error('You have to fill out the alternative text.').required(),
    },
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'alt',
    },
  },
}
