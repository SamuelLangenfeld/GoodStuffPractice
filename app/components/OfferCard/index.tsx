import React from 'react'
import styles from './styles.module.css'

const OfferCard = ({ flight }) => {
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
        {new Date(departureDate).toDateString()} to {new Date(returnDate).toDateString()}
      </div>
      <div>
        Price: {`${total} ${currency}`}
      </div>
    </div>
  )
}

export default OfferCard