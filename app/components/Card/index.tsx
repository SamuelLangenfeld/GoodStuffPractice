import React from 'react'
import styles from './styles.module.css'

const Card = ({ flight, locations, setCurrentOffers, currency }) => {
  const { destination, price, links, departureDate, returnDate } = flight
  const destinationName = locations[destination].detailedName
  const { total } = price
  const {flightOffers} = links
  const handleOffersChange = async () => {
    const res = await fetch('/api/offers', {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify({link: flightOffers})
    })
    const data = await res.json()
    const offers = data.flights
    setCurrentOffers(offers)
  }
  return (
    <button className={styles.card} onClick={handleOffersChange}>
      <div>
        {`${destinationName}`} 
      </div>
      <div>
        {departureDate} to {returnDate}
      </div>
      <div>
        Price: {`${total} ${currency}`}
      </div>
    </button>
  )
}

export default Card