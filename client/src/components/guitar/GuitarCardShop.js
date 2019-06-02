import React from 'react'

import GuitarCard from './GuitarCard';
import Grid from '@material-ui/core/Grid';
// classes, name, price, brand, id

const GuitarCardShop = (props) => {
  console.log(props);

  const renderCard = (
    props.products.map(card => (
      <Grid item xs={12} md={4}>
        <GuitarCard
          id={card._id}
          name={card.name}
          price={card.price}
          brand={card.brand.name}
        />
      </Grid>
    )))

  return (
    <div>
      {
        props.products.length === 0
          ?
          <div> no result </div>
          : null
      }
      <Grid container spacing={8}>
        {renderCard}
      </Grid>

    </div>
  )
}

export default GuitarCardShop
