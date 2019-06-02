import React from 'react'


// material-ui
import Button from '@material-ui/core/Button';
import ShippingIcon from '@material-ui/icons/LocalShipping'
import AvailableIcon from '@material-ui/icons/CheckCircle';
import NotAvailableIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MoneyIcon from '@material-ui/icons/Money';
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core';


const styles = theme => ({
  addToCartBtn: {
    margin: '16px',
    justifyContent: 'center',
    display: 'flex'
  }
});


const ProductInfo = (props) => {

  const { classes, detail } = props;

  const showProductTag = (detail) => (
    <div>
      {
        detail.shipping ?
          <List>
            <ListItem>
              <ListItemIcon>
                <ShippingIcon />
              </ListItemIcon>
              <ListItemText primary='Free Shipping and Return' />
            </ListItem>
          </List> : null
      }
    </div>
  );

  const showAvailableTag = (detail) => (
    <div>
      {
        detail.shipping ?
          <List>
            <ListItem>
              <ListItemIcon>
                <AvailableIcon />
              </ListItemIcon>
              <ListItemText primary='Available in store now' />
            </ListItem>
          </List>
          :
          <List>
            <ListItem>
              <ListItemIcon>
                <NotAvailableIcon />
              </ListItemIcon>
              <ListItemText primary='Not available in store now' />
            </ListItem>
          </List>
      }
    </div>
  );

  const showProductAction = (detail) => (
    <div>
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            <MoneyIcon />
          </ListItemIcon>
          <ListItemText primary={`${detail.price} vnd`} />
        </ListItem>

      </List>
      <div className={classes.addToCartBtn}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => props.addToCartHandler(detail._id)}
        >
          Add To Cart
             </Button></div>
    </div>
  );

  const showSpec = (detail) => (
    <div>
      <Divider />
      <h2>Specification: </h2>
      {
        <div>
          <List>
            <ListItem>
              <Typography>{`Frets: ${detail.frets}`}</Typography>
            </ListItem>
          </List>
          <List>
            <ListItem>
              <Typography>{`Wood: ${detail.wood.name}`}</Typography>
            </ListItem>
          </List>
        </div>
      }
    </div>
  );


  return (
    <div>
      <h1> {detail.brand.name} {detail.name} </h1>
      <Typography>{detail.description}</Typography>
      {showProductTag(detail)}
      {showAvailableTag(detail)}
      {showProductAction(detail)}
      {showSpec(detail)}
    </div>
  )
}

export default withStyles(styles)(ProductInfo);
