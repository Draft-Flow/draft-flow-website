// resolveDocumentActions.js

// import the default document actions
import defaultResolve from 'part:@sanity/base/document-actions'

import {SetAndPublishAction} from './HelloWorldAction'

export default function resolveDocumentActions(props) {
  if (props.type === 'route') {
    return [...defaultResolve(props), SetAndPublishAction]
  }
  
  return defaultResolve(props)
}