import { FaBicycle } from 'react-icons/fa'

export default {
  name: 'refurbBike',
  type: 'document',
  icon: FaBicycle,
  title: 'Refurbed Bikes',
  __experimental_actions: ['update', 'create', 'delete', 'publish'],
  fields: [
    {
      name: 'bike',
      type: 'bike',
      title: 'Bike'
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price'
    },
    {
      name: 'altPrice',
      type: 'string',
      title: 'Alt Price'
    }
  ]
}
