import { FaCog } from 'react-icons/fa'

export default {
  name: 'siteSettings',
  type: 'document',
  icon: FaCog,
  title: 'Site Settings',
  __experimental_actions: ['update', 'create', 'delete', 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'url',
      type: 'string',
      title: 'URL',
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
        },
      ],
    },
    {
      name: 'company',
      type: 'object',
      title: 'Company',
      fields: [
        {
          name: 'name',
          type: 'string',
          title: 'Company Name',
        },
        {
          name: 'number',
          type: 'string',
          title: 'Company Number',
        },
        {
          name: 'vat',
          type: 'string',
          title: 'VAT Number',
        },
      ],
    },
    {
      name: 'contact',
      type: 'object',
      title: 'Contact',
      fields: [
        {
          name: 'phone',
          type: 'string',
          title: 'Phone Number',
        },
        {
          name: 'email',
          type: 'string',
          title: 'Email Address',
        },
        {
          name: 'url',
          type: 'string',
          title: 'URL',
        },
        {
          name: 'address',
          type: 'string',
          title: 'Street Address',
        },
        {
          name: 'city',
          type: 'string',
          title: 'City',
        },
        {
          name: 'region',
          type: 'string',
          title: 'Region',
        },
        {
          name: 'postalCode',
          type: 'string',
          title: 'Postal Code',
        },
        {
          name: 'country',
          type: 'string',
          title: 'Country',
        },
      ],
    },
    {
      name: 'social',
      type: 'social',
      title: 'Social Media',
    },
  ],
}
