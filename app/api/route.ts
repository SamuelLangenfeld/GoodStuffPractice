import secureAccessToken, {revalidateToken} from "../lib/secureAccessToken"

const fetchFlights = async () => {
  const accessToken = await secureAccessToken()
  const res = await fetch(`https://${process.env.flights_api_url}/v1/shopping/flight-destinations?origin=${process.env.origin}&oneWay=false&nonStop=false&duration=3%2C15`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
  })
  const flights = await res.json()
  return flights
}

const secureFlights = async () => {
  try {
    let flights = await fetchFlights()
    if (flights.errors) {
      console.log('error fetching flights, reattempting authorization and fetch', JSON.stringify(flights.errors))
      try {
        await revalidateToken()
        flights = await fetchFlights()
        return flights
      }
      catch (e) {
        console.log('second attempt to fetch flights errored', e)
      }
    }
    return flights
  }
  catch (e) {
    console.log('unable to retrieve flights', e)
  }
}

export const revalidate = 1700

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  let flights
  try {
    flights = await secureFlights()
  }
  catch (e) {
    console.log('unable to fetch flights', e)
  }
  return Response.json({ flights })
}