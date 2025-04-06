import {Flex, Text} from '@sanity/ui'
import React from 'react'

export default (props) => {
  const {title: url} = props

  return (
    <Flex padding={3} align="center" justify="center">
      {typeof url === 'string' 
        ? <iframe src={url} width="100%" height="580" frameborder="0" scrolling="no"></iframe>
        : <Text>Add a YouTube URL</Text>}
    </Flex>
  )
}
