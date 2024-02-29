'use client'
import React, { useEffect, useState } from 'react'
import Flights from './flights'
import Card from './components/Card'
import OfferCard from './components/OfferCard'
import styles from './styles.module.css'

export default function Page() {
  const [flights, setFlights] = useState({} as any)
  const [currentOffers, setCurrentOffers] = useState({} as any)
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
  return (
    <>
      <h1>Departures</h1>
      <div className={styles.container}>
        <div className={styles.card_display}>
          {departures && departures.map((flight, index) => {
            return <Card flight={flight} key={index} locations={locations} setCurrentOffers={setCurrentOffers} currency={currency} />
          })}
        </div>
        <div className={styles.offer_display}>
          <div>Display Flight Offers</div>
          {offers?.length && offers.map((offer, index) => {
            return <OfferCard flight={offer} key={index}/>
          })}
          <div>{JSON.stringify(currentOffers)}</div>
        </div>
      </div>
    </>
  )
}