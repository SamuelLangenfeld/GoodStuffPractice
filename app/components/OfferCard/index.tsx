import React from 'react'
import styles from './styles.module.css'

const OfferCard = ({ flight, airlines }) => {
  const { itineraries, price } = flight
  const departItinerary = itineraries[0]
  const returnItinerary = itineraries[1]
  const departureInfo = departItinerary.segments[0].departure
  const departureDate = departureInfo.at
  const origin = departureInfo.iataCode

  const returnInfo = returnItinerary.segments[0].departure
  const returnDate = returnInfo.at
  const destination = returnInfo.iataCode

  const total = price.total
  const currency = price.currency
  return (
    <div className={styles.offer_card}>
      <div>
        {`${origin} to ${destination}`} 
      </div>
      <div>
        {new Date(departureDate).toLocaleDateString()} - {new Date(returnDate).toLocaleDateString()}
      </div>
      <div>
        Price: {`${total} ${currency}`}
      </div>
      <div>
        {airlines.join(', ')}
      </div>
    </div>
  )
}

export default OfferCard