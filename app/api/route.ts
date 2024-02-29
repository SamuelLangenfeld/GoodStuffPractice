import secureAccessToken, {revalidateToken} from "../lib/secureAccessToken"

const fetchFlights = async () => {
  const accessToken = await secureAccessToken()
  const res = await fetch('https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=MAD&oneWay=false&nonStop=false', {
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

export async function GET() {
  let flights
  try {
    flights = await secureFlights()
  }
  catch (e) {
    console.log('unable to fetch flights', e)
  }
  return Response.json({ flights })
}