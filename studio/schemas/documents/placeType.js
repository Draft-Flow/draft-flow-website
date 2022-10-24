import { FaMapSigns } from 'react-icons/fa'

export default {
  name: 'placeType',
  type: 'document',
  icon: FaMapSigns,
  title: 'Place Types',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'icon',
      type: 'image',
      title: 'Icon',
      description:
        'Upload an SVG icon for this place type. Preferrably from https://fonts.google.com/icons.',
    },
  ],
}
