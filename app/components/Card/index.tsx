import React from 'react'
import styles from './styles.module.css'
import classnames from 'classnames'

const Card = ({ flight, onClick, currency, selected, destinationName }) => {
  const { price, departureDate, returnDate } = flight
  const { total } = price
  
  const buttonClassName = classnames(styles.card, { [styles.selected]: selected })
  return (
    <button className={buttonClassName} onClick={onClick}>
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