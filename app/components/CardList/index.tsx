import React from "react";
import Card from "../Card";

const CardList = ({ departures, setSelectedFlight, setCurrentOffers, locations, currency, selectedFlight }) => {
  return (
    <>
      {departures.map((flight, index) => {
        const handleClick = async () => {
          setSelectedFlight(index)
          const flightOffers = flight.links.flightOffers
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
        const { destination} = flight
        const destinationName = locations[destination].detailedName
          return (
            <Card
              flight={flight}
              destinationName={destinationName}
              onClick={handleClick}
              key={index}
              currency={currency}
              selected={index === selectedFlight} />
          )
      })}
    </>
  )
}

export default CardList