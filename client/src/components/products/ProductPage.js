import React, { Component } from 'react'
import PageTop from './PageTop';
import { getProductDetail, clearProductDetail } from '../../redux/actions/product_actions';
import { addToCart } from '../../redux/actions/user_actions';
import { openSnackbarAction, closeSnackbarAction } from '../../redux/actions/snackbar_action';

import { connect } from 'react-redux';
import ProductInfo from './ProductInfo';
import SnackBarComponent from '../snack-bar/SnackBar';
import ProductImg from './productImg';
// UI
import Grid from '@material-ui/core/Grid';

class ProductPage extends Component {

  async componentDidMount() {
    // get Id from params
    const id = this.props.match.params.id;
    // console.log(id);


    await this.props.getProductDetail(id, (notFoundId) => {
      if (notFoundId) {
        this.props.history.push('/')
      }
    });
  }

  componentWillUnmount() {
    this.props.clearProductDetail();
  }

  addToCartHandler = async (id) => {
    await this.props.addToCart(id);
    this.props.openSnackbarAction(`Added ${this.props.productDetail.name} To Cart Successfully!!! `);
  }

  render() {

    const { msg, open } = this.props.snackbar;

    if (this.props.loading) {
      return <div>loading</div>
    }
    return (
      <div>
        <Grid container>
          <Grid item xs={false} md={2} />
          <Grid
            item
            xs={6} md={3}
          >
            <ProductImg detail={this.props.productDetail} />
          </Grid>
          <Grid
            item
            xs={6} md={5}
          >
            <ProductInfo
              detail={this.props.productDetail}
              addToCartHandler={(id) => this.addToCartHandler(id)}
            />
          </Grid>
          <Grid
            item
            xs md={2}
            xs={false}
          />
        </Grid>
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
      </div>
    )
  }
}

const mapStateToProps = state => ({
  productDetail: state.products.productDetail,
  loading: state.products.productDetailLoading,
  snackbar: state.snackbar
});

export default connect(
  mapStateToProps, {
    clearProductDetail,
    getProductDetail,
    addToCart,
    openSnackbarAction,
    closeSnackbarAction,
  })(ProductPage);