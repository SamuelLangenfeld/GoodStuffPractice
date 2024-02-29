import secureAccessToken, { revalidateToken } from "../../lib/secureAccessToken"

const fetchOffers = async (link, accessToken) => {
  const res = await fetch(`${link}&currencyCode=USD&max=10`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  })
  const flights = await res.json()
  return flights
}

export async function POST(req: Request) {
  const { link } = await req.json()
  let accessToken = await secureAccessToken()
  let flights
  try {
    flights = await fetchOffers(link, accessToken)
  }
  catch (e) {
    console.log('failed request for offers', e)
  }
  if (flights.errors) {
    console.log('attempting revalidation for offers')
    await revalidateToken()
    accessToken = await secureAccessToken()
    flights = await fetchOffers(link, accessToken)
  }
  return Response.json({ flights })
}