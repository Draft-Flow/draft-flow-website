export default function eventsAction(originalPublishAction) {
  return (props) => {
    const originalResult = originalPublishAction(props)
    return {
      ...originalResult,
      onHandle: () => {
        // Add our custom functionality
        console.log('Hello world!')
        // then delegate to original handler
        originalResult.onHandle()
      },
    }
  }
}
