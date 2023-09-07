export default {
  name: 'basicImage',
  type: 'image',
  title: 'Image',
  description: 'Upload an image',
  fields: [{
    name: 'name',
    type: 'string',
    title: 'Name'
  }],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'name',
    },
  },
}
