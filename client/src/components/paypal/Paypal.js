import React, { Component } from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
  render() {
    const onSuccess = (payment) => {
      // console.log(JSON.stringify(payment))
      this.props.transactionSuccess(payment);
    }

    const onCancel = data => {
      console.log(JSON.stringify(data))
    }


    const onError = err => {
      console.log(JSON.stringify(err))
    }

    let env = 'sandbox';
    let currency = 'USD';
    let total = this.props.toPay;

    const client = {
      sandbox: 'Ad31_ZEHpTWMJ-vbOmA5rLG-3RcQlYpEsV5pxd4Y8SLGa17t704g_NrVmdJLF11EJANaz0eSwOre-wIf',
      production: ''
    }

    return (
      <div>
        <PaypalExpressBtn 
          env={env}
          client={client}
          currency={currency}
          total={total}
          onCancel={onCancel}
          onSuccess={onSuccess}
          onError={onError}
          style={{
            size:'large',
            color: 'blue',
            shape:'rect',
            label: 'checkout'
          }}
        />
      </div>
    )
  }
}

export default Paypal;
