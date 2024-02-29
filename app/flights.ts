type Flights = {
  data: Array<{
    type: string,
    origin: string,
    destination: string,
    departureDate: string,
    returnDate: string,
    price: {
      total: string
    },
    links: {
      flightDates: string,
      flightOffers: string
    }
  }>,
  dictionaries: {
    currencies: Record<string, string>,
    locations: Record<string, { subType: string, detailedName: string }
    >
  },
  meta: {
    currency: string,
    links: {
      self: string
    },
    defaults: {
      departureDate: string,
      duration: string,
      viewBy: string
    }
  }
}

export default Flights