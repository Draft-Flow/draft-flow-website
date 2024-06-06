const { EleventyServerless } = require("@11ty/eleventy")

async function handler(event) {
  let elev = new EleventyServerless("bike-reservations", {
    path: new URL(event.rawUrl).pathname,
    query: event.queryStringParameters,
    functionsDir: "./netlify/functions/",
  })

  try {
    let [page] = await elev.getOutput()

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html charset=UTF-8",
      },
      body: page.content,
      
    }
  } catch (error) {
    // Only console log for matching serverless paths
    // (otherwise you’ll see a bunch of BrowserSync 404s for non-dynamic URLs during --serve)
    if (elev.isServerlessUrl(event.path)) {
      console.log("Serverless Error:", error)
    }

    return {
      statusCode: error.httpStatusCode || 500,
      body: JSON.stringify(
        {
          error: error.message,
        },
        null,
        2
      ),
    }
  }
}

exports.handler = handler