import React from 'react'
import PropTypes from 'prop-types'
import getYouTubeId from 'get-youtube-id'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

const Preview = ({ value }) => {
  const { url } = value
  const id = getYouTubeId(url)
  return <LiteYouTubeEmbed id={id} />
}

export default {
  name: 'youtube',
  type: 'object',
  title: 'YouTube Embed',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
    },
  ],
  preview: {
    select: {
      url: 'url',
    },
    component: Preview,
  },
}

Preview.propTypes = {
  value: {
    url: PropTypes.string
  }
}
