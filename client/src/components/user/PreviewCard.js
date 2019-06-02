import React, { Fragment } from 'react'

// UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  card: {
    padding: '28px 20px'
  },
  img: {
    witdh: '110px',
    height: '110px',
    borderWidth: '1px'
  },
  boxInfo: {
    paddingLeft: '15px',
    padidngRight: '50px',
    float: 'left'
  },
  quantityBox: {
    maxWidth: '50px'
  }
});

const PreviewCard = (props) => {
  // console.log(props.product);
  const {
    classes,
    product,
    onClickDelete,
    onIncreaseQuantity,
    onDecreaseQuantity
  } = props;

  return (
    <Fragment>
      <Paper className={classes.card}>
        <Grid container>
          <Grid item md={3}>
            <div id='product-img' >
              <img className={classes.img}
                src={product.images[0] ? product.images[0].url : null}
              />
            </div>
          </Grid>
          <Grid container item md={6} >
            <Grid item md={8}>
              <Typography variant='overline' gutterBottom>Name </Typography>
              <Typography gutterBottom >{`${product.brand.name} ${product.name}`}</Typography>
              <IconButton
                style={{ padding: '0px' }}
                onClick={(id) => onClickDelete(product._id)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
            <Grid item md={4}>
              <Typography variant='overline' gutterBottom>Price</Typography>

              <Typography>{`${product.price} đ`}</Typography>
            </Grid>
          </Grid>
          <Grid item md={3}>
            <Typography
              gutterBottom
              variant='overline'
              align='center'
            >
              Quantity
            </Typography>
            <div id='quantity-box'>
              <IconButton  onClick={id => onDecreaseQuantity(product._id)}>
                <MinusIcon/>
              </IconButton>
              <TextField
                className={classes.quantityBox}
                variant='standard'
                value={product.quantity}
              />
              <IconButton onClick={id => onIncreaseQuantity(product._id)}>
                <AddIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  )
}

export default withStyles(styles)(PreviewCard);
