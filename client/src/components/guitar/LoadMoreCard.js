import React, { Fragment } from 'react'
import GuitarCardShop from './GuitarCardShop';
import Button from '@material-ui/core/Button';

const LoadMoreCard = (props) => {
  // console.log(props);

  return (
    <Fragment>
      <div>
        <GuitarCardShop
          products={props.products}
        />
      </div>
      {
        props.size > 0 && props.size >= props.limit ?
          <div style={{ textAlign: 'center' }}>
            <Button
              variant='contained'
              color='primary'
              onClick={props.loadMore}
            >
              LoadMore
            </Button>
          </div>
        : null
      }

    </Fragment>
  )
}

export default LoadMoreCard
