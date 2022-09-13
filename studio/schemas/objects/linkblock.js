export default {
  name: 'linkblock',
  type: 'object',
  title: 'Link Block',
  fields: [
    {
      name: 'title',
      type: 'text',
      title: 'Title',
      rows: 1,
    },
    {
      name: 'text',
      type: 'basicPortableText',
      title: 'Text',
      rows: 1,
    },
    {
      name: 'link',
      type: 'text',
      title: 'Link',
      rows: 1,
    },
    {
      name: 'buttonText',
      type: 'text',
      title: 'Button Text',
      rows: 1,
    },
    {
      name: 'background',
      type: 'image',
    },
  ],
}
