export default {
  name: 'placeTypeReference',
  type: 'object',
  title: 'Place Type reference',
  fields: [
    {
      name: 'placeType',
      type: 'reference',
      to: [
        {
          type: 'placeType'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'placeType.title',
      media: 'placeType.icon.asset'
    }
  }
}