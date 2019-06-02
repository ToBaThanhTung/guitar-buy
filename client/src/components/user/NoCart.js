import React from 'react'
import emptyCartImage from '../../assets/img/emptyCart.png'

const NoCart = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <img src={emptyCartImage} />
    </div>
  )
}

export default NoCart;
