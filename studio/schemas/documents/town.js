import { FaStoreAlt } from "react-icons/fa";

export default {
  name: 'town',
  type: 'document',
  icon: FaStoreAlt,
  title: 'Towns',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        'A URL-friendly version of the name',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'banner',
      type: 'image',
      title: 'Banner Image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      type: 'geopoint',
      title: 'Location',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'bodyPortableText',
      title: 'Description',
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
}
