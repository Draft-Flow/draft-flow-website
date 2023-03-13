export default {
  name: 'logoImage',
  type: 'image',
  title: 'Logo',
  description: 'Upload a square, transparent PNG image',
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
