export default {
  name: 'place',
  type: 'document',
  title: 'Places',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'location',
      type: 'geopoint',
      title: 'Location'
    }
  ]
}