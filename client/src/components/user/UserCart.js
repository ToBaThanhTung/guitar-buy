import React, { Component, Fragment } from 'react'
import UserLayout from '../../hoc/user/index';
import PreviewCard from './PreviewCard';
import TotalBox from './TotalBox';
import NoCart from './NoCart';
import PaymentSuccess from './PaymentSuccess';
import { connect } from 'react-redux';
import { getCartItems, removeCartItem, increaseQuantity, decreaseQuantity } from '../../redux/actions/user_actions';
import SnackBarComponent from '../../components/snack-bar/SnackBar';
import { openSnackbarAction, closeSnackbarAction } from '../../redux/actions/snackbar_action';

// Ad31_ZEHpTWMJ-vbOmA5rLG-3RcQlYpEsV5pxd4Y8SLGa17t704g_NrVmdJLF11EJANaz0eSwOre-wIf

class UserCart extends Component {

  state = {
    loading: true,
    showSuccess: false,
    showTotal: false,
    showEmptyCart: false,
  }

  componentDidMount = async () => {
    let cartItem = [];
    let user = this.props.user;

    if (user.userData.cart) {
      console.log(user.userData.cart.length);

      if (user.userData.cart.length > 0) {
        // push id to cartItem
        user.userData.cart.forEach(item => {
          cartItem.push(item.id);
        });
        // pass cartItem and userCart to redux action
        // => get list product & quantity
        await this.props.getCartItems(cartItem, user.userData.cart);
        this.setState({ ...this.state, loading: false });
      } else {
        this.setState({ ...this.state, showEmptyCart: true });
      }
    }
  }


  onClickDelete = async (id) => {
    console.log('click deleted!');
    await this.props.removeCartItem(id);
    let lengthOfCart = this.props.user.userData.cart.length;
    if (lengthOfCart === 0) {
      this.setState({ ...this.state, showEmptyCart: true })
    }
    this.props.openSnackbarAction(`Delete successfully !!!`);
  }


  transactionError = () => {

  }

  transactionCancle = () => {

  }

  transactionSuccess = (data) => {
    this.setState({
      ...this.state,
      showSuccess: true,
    })
    console.log(data);

  }

  onIncreaseQuantity = async id => {
    console.log('click plus btn! ');
    await this.props.increaseQuantity(id);
  }

  onDecreaseQuantity = async id => {
    console.log('click minus button!');
    await this.props.decreaseQuantity(id);
  }


  render() {

    if (this.state.showSuccess) {
      return (
        <UserLayout>
          <PaymentSuccess />
        </UserLayout>
      )
    }
    if (this.state.showEmptyCart) {
      return <NoCart />
    }
    if (this.props.user.getCartLoading) {
      return <div>loading</div>
    }

    const { msg, open } = this.props.snackbar;
    return (
      <UserLayout>
        <Fragment>
          {
            this.props.user.cartDetail.map((product, indx) => (
              <PreviewCard
                product={product}
                key={indx}
                onClickDelete={(id) => this.onClickDelete(id)}
                onIncreaseQuantity = {(id) => this.onIncreaseQuantity(id)}
                onDecreaseQuantity = {id => this.onDecreaseQuantity(id)}
              />
            ))
          }
          <TotalBox
            totalPrice={this.props.totalPrice}
            transactionSuccess={data => this.transactionSuccess(data)}
            transactionCancle={data => this.transactionCancle(data)}
            transactionError={err => this.transactionError(err)}
          />
          {
            this.props.snackbar.open ?
              <SnackBarComponent
                msg={msg}
                open={open}
                onClose={this.props.closeSnackbarAction}
                vertical='bottom'
                horizontal='right'
              />
              : null
          }

        </Fragment>
      </UserLayout>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  totalPrice: state.user.totalPrice,
  snackbar: state.snackbar,
});

export default connect(
  mapStateToProps,
  {
    getCartItems,
    removeCartItem,
    openSnackbarAction,
    closeSnackbarAction,
    increaseQuantity,
    decreaseQuantity
  }
)(UserCart);