import React, { Fragment } from 'react'
import BuySuccess from '../../assets/img/buy-success.png'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  img: {
    objectFit: 'container',
    width: 'auto',
    height: 'auto'
  },
  paper: {
    margin: '10px',
    display: 'flex',
    justifyContent: 'center',
    width: '500px'
  }
});

const PaymentSuccess = ({ classes }) => {
  return (
    <Fragment className={classes.paper} >
      <Card>
        <CardMedia
          component='img'
          src={BuySuccess}
          alt='buy-success'
          className={classes.img}
        />
        <CardContent>
          <Typography>Thank you for buy our product!</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            color='primary'
          >
            Store
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  )
}

export default withStyles(styles)(PaymentSuccess);
