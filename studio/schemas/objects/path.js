export default {
  name: 'path',
  type: 'object',
  title: 'Path',
  fields: [
    {
      name: 'title',
      type: 'text',
      title: 'Title',
      rows: 1,
    },
    {
      name: 'description',
      type: 'basicPortableText',
      title: 'Description',
      rows: 1,
    },
    {
      name: 'category',
      type: 'reference',
      title: 'Category',
      to: {
        type: 'routeCategory',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'gpxRoute',
      type: 'file',
      title: 'GPX Route',
      description:
        'A GPX of the route. Please ensure the GPX route contains elevation data.',
    },
  ],
}
