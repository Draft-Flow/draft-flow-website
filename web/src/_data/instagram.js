const { imageSize } = require('image-size')

const getInstagram = async () => {
  const myHeaders = new Headers()

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
}


const posts = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,permalink,media_url,media_type,timestamp,children{media_url}&limit=20&access_token=${process.env.INSTAGRAM_TOKEN}`, requestOptions)
  .then(response => response.json())
  .then(result => result)
  // eslint-disable-next-line
  .catch(error => console.log('error', error))

const postsWithSizes = await Promise.all(
  await posts.data.map(async (post) => {
  const image = await fetch(post.media_url)
    .then(response => response.arrayBuffer())
    // eslint-disable-next-line
    .catch(error => console.log('error', error))
  
  const buffer = Buffer.from(image, "utf-8")
  const dimensions = await imageSize(buffer)

  return {
    ...post,
    width: dimensions.width,
    height: dimensions.height
  }
})
)

  // Refresh the token
fetch(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${process.env.INSTAGRAM_TOKEN}`)
.then(response => response.json())
.then(() => 'Instagram token refreshed')
// eslint-disable-next-line
.catch(error => console.log('error', error))

  return postsWithSizes
}


module.exports = getInstagram
