
export default function eventsAction(originalPublishAction) {
  return (props) => {
    const originalResult = originalPublishAction(props)
    return {
      ...originalResult,
      onHandle: async () => {
        // Add our custom functionality
        console.log({originalResult})
        
        

        // then delegate to original handler
        originalResult.onHandle()
      },
    }
  }
}
