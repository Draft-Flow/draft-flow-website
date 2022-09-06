import { FaCog } from "react-icons/fa";

export default {
  name: 'siteSettings',
  type: 'document',
  icon: FaCog,
  title: 'Site Settings',
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'tagline',
      type: 'string',
      title: 'Tagline',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your blog for search engines and social media.',
    },
    {
      name: 'logo',
      type: 'image',
      title: 'Logo',
      description: 'Logo for the website',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.',
          validation: (Rule) =>
            Rule.error('You have to fill out the alternative text.').required(),
          options: {
            isHighlighted: true,
          },
        },
      ],
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your blog.',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'fundedBy',
      type: 'array',
      title: 'Funded By',
      description: 'Current funders of Perthshire Gravel',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessiblity.',
              validation: (Rule) =>
                Rule.error(
                  'You have to fill out the alternative text.'
                ).required(),
              options: {
                isHighlighted: true,
              },
            },
            {
              name: 'link',
              type: 'url',
              title: 'Link',
              options: {
                isHighlighted: true,
              },
            },
          ],
        },
      ],
      options: {
        sortable: true,
      },
    },
    {
      name: 'charityInfo',
      type: 'basicPortableText',
      title: 'Charity Info',
    },
    {
      name: 'banner',
      type: 'image',
      title: 'Banner Image',
      description: 'Banner image for the website',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.',
          validation: (Rule) =>
            Rule.error('You have to fill out the alternative text.').required(),
          options: {
            isHighlighted: true,
          },
        },
      ],
    },
  ],
}
