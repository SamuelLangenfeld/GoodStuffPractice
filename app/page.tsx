'use client'
import React, { useEffect, useState } from 'react'
import Flights from './flights'
import OfferCard from './components/OfferCard'
import CardList from './components/CardList'
import styles from './styles.module.css'

export default function Page() {
  const [flights, setFlights] = useState({} as any)
  const [currentOffers, setCurrentOffers] = useState({} as any)
  const [selectedFlight, setSelectedFlight] = useState(null)
  useEffect(() => {
    fetch('/api').then(res => res.json()).then(data => {
      const flightData: Flights = data.flights
      setFlights(flightData)
    })
  }, [])

  const departures = flights?.data || null
  const locations = flights?.dictionaries?.locations
  const currency = flights?.meta?.currency

  const offers = currentOffers.data
  const carriers = currentOffers.dictionaries?.carriers
  return (
    <>
      <h1>Departures</h1>
      <div className={styles.container}>
        <div className={styles.card_display}>
          {departures && (
            <CardList
              departures={departures}
              currency={currency}
              selectedFlight={selectedFlight}
              setSelectedFlight={setSelectedFlight}
              setCurrentOffers={setCurrentOffers}
              locations={locations} />
          )}
        </div>
        <div className={styles.offer_display}>
          <div>Display Flight Offers</div>
          {offers?.length && offers.map((offer, index) => {
            const airlines = offer.validatingAirlineCodes.map(code => carriers[code])
            return <OfferCard flight={offer} key={index} airlines={airlines} />
          })}
        </div>
      </div>
    </>
  )
}