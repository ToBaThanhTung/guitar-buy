import React, { Fragment } from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paypal from '../paypal/Paypal';

const styles = theme => ({
  box: {
    marginTop: '10px',
    height: '70px',
    width: '270px',
    padding: '17px 20px 21px 19px'
  },
  price: {
    color: '#fe3834',
    fontSize: '22px',
    fontWeight: 400,
  },
  btnTotal: {
    backgroundColor: '#ff424e',
    color: 'white',
    width: '270px',
    marginTop: '8px'
  }
});

const TotalBox = ({
  classes,
  totalPrice,
  transactionCancle,
  transactionError,
  transactionSuccess
}) => {

  return (
    <Fragment>
      <Paper className={classes.box}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant='subtitle1'
            gutterBottom
          >
            Total:
          </Typography>
          <div>
            <Typography
              variant='subtitle1'
              className={classes.price}
            >
              {`${totalPrice} ₫`}
            </Typography>
            <Typography variant='caption'>( * Include VAT )</Typography>
          </div>
        </div>
      </Paper>
      <Paypal
        toPay={totalPrice}
        transactionError={data => transactionError(data)}
        transactionCancle={data => transactionCancle(data)}
        transactionSuccess={data => transactionSuccess(data)}
      />
    </Fragment>
  )
}

export default withStyles(styles)(TotalBox);
