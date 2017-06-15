const consumerKey = '67851-6deb38922d19b6e09bd532f0'

const api = {
  request: 'https://getpocket.com/v3/oauth/request',
  authorize : 'https://getpocket.com/v3/oauth/authorize',
  modify: 'https://getpocket.com/v3/send'
}

const options = {
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-Accept": "application/json"
  },
  method: 'POST',
}

const composeOptions = (body) => Object.assign({}, options, {body})

// const getRequestToken = () => {
//   const body = `consumer_key=${consumerKey}&redirect_uri=my-app:authorizationFinished`
//   return fetch(api.request, composeOptions(body)).then(r => r.json())
// }
//
// const getAccessToken = (requestToken) => {
//   const body = `consumer_key=${consumerKey}&code=${requestToken}&redirect_uri=my-app:authorizationFinished`
//   return fetch(api.authorize, composeOptions(body)).then(r => r.json())
// }

const addReadTag = (item_id, accessToken) => {

  const actions = [
    {
      action: 'tags_add',
      item_id,
      tags: 'done!!!',
      time: Date.now()
    }
  ]

  const body = `actions=${JSON.stringify(actions)}&consumer_key=${consumerKey}&access_token=${accessToken}`
  return fetch(api.modify, composeOptions(body)).then(r => r.json())
}