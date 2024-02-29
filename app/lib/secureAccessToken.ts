let accessToken

const fetchToken = async () => {
  const res = await fetch(`https://${process.env.flights_api_url}/v1/security/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${process.env.client_id}&client_secret=${process.env.client_secret}`
    })
  const data = await res.json()
  return data
}

const secureAccessToken = async () => {
  if (!accessToken) {
    await revalidateToken()
  }
  return accessToken
}

export const revalidateToken = async () => {
  try {
    let data = await fetchToken()
    if (data.errors || data.error) {
      console.log('validate token error')
      console.log(JSON.stringify(data))
      console.log('attempting another fetch for access token')
      data = await fetchToken()
    }
    accessToken = data.access_token
  }
  catch (e) {
    console.log('unable to retrieve access token', e)
  }
}

export default secureAccessToken