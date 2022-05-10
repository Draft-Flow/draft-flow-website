export default {
  name: 'placeReference',
  type: 'object',
  title: 'Place reference',
  fields: [
    {
      name: 'place',
      type: 'reference',
      to: [
        {
          type: 'place'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'place.name',
      subtitle: 'place.location',
    }
  }
}