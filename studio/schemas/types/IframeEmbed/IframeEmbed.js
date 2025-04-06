import {defineType, defineField} from 'sanity'
import { BiCodeBlock } from 'react-icons/bi'
import IframeEmbedPreview from './IframeEmbedPreview'

export default defineType({
  name: 'iframeEmbed',
  type: 'object',
  title: 'iFrame Embed',
  icon: BiCodeBlock,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'Iframe embed URL',
    }),
  ],
  preview: {
    select: {
      title: 'url',
    },
  },
  components: {
    preview: IframeEmbedPreview,
  }
})
