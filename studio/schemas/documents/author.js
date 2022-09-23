import { FaUser } from "react-icons/fa";

export default {
  name: 'author',
  type: 'document',
  icon: FaUser,
  title: 'Architects',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'nickname',
      type: 'string',
      title: 'Nickname',
      description: 'A nickname or their first name'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        'Some frontends will require a slug to be set to be able to show the person',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'banner',
      type: 'image',
      title: 'Banner Image',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Photo',
    },
    {
      name: 'bio',
      type: 'bioPortableText',
      title: 'Biography',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      media: 'image',
    },
  },
}
