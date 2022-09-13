import { FaFile } from "react-icons/fa"

export default {
  name: 'staticPages',
  type: 'document',
  icon: FaFile,
  title: 'Static Pages',
  __experimental_actions: ['update', 'create', 'delete', 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO',
    },
    {
      name: 'banner',
      type: 'image',
      title: 'Banner Image',
      description: 'Banner image for the page',
    },
    {
      name: 'linkBlock1',
      type: 'linkblock',
      title: 'Link Block #1',
      hidden: ({document}) => !document._id.endsWith('staticPages.home')
    },
    {
      name: 'linkBlock2',
      type: 'linkblock',
      title: 'Link Block #2',
      hidden: ({document}) => !document._id.endsWith('staticPages.home')
    },
  ],
}
