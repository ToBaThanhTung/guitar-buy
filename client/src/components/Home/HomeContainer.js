import React, { Component, Fragment } from 'react'

import GuitarCard from '../guitar/GuitarCard';
import HomeSlider from './home_slider';
import Grid from '@material-ui/core/Grid';
import SnackBarComponent from '../snack-bar/SnackBar';


// redux
import { connect } from 'react-redux';
import {
  getProductsBySell,
  getProductsByArrival,
} from '../../redux/actions/product_actions';

import { openSnackbarAction, closeSnackbarAction } from '../../redux/actions/snackbar_action';

import { Typography } from '@material-ui/core';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  async componentDidMount() {
    await this.props.getProductsByArrival();
    await this.props.getProductsBySell();
    this.setState({ loading: false });
  }

  render() {

    if (this.state.loading === true) return <div> loading </div>
    const { byArrival, bySell } = this.props;
    const {open, msg} = this.props.snackbar;
    // console.log(byArrival.articles);

    const renderListGuitarByArrival = (
      <Fragment>
        <Typography variant='headline' align='center'>New Arrival</Typography>
        <Grid container spacing={8}>
          <Grid item xs={1} md={2}>
          </Grid>
          <Grid item xs={10} md={8} container>
            {byArrival.articles.map((article, i) => (
              <Grid item sm={6} md={4} xs={12} key={i}>
                <GuitarCard
                  brand={article.brand.name}
                  price={article.price}
                  name={article.name}
                  id={article._id}
                  images={article.images[0]}
                />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={1} md={2}>
          </Grid>
        </Grid>
      </Fragment>
    );

    const renderListGuitarBySell = (
      <Fragment>
        <Typography variant='headline' align='center'>Best Selling</Typography>
        <Grid container spacing={8}>
          <Grid item xs={1} md={2}>
          </Grid>
          <Grid item xs={10} md={8} container>
            {bySell.articles.map((article, i) => (
              <Grid item sm={6} md={4} xs={12} key={i}>
                <GuitarCard
                  brand={article.brand.name}
                  price={article.price}
                  name={article.name}
                  id={article._id}
                  images={article.images[0]}
                />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={1} md={2}>
          </Grid>
        </Grid>
      </Fragment>
    );
    return (
      <div style={{ background: '#F4F4F4' }}>
        <HomeSlider></HomeSlider>
        {renderListGuitarByArrival}
        {renderListGuitarBySell}
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
    );
  }
}


const mapStateToProps = (state) => ({
  byArrival: state.products.byArrival,
  bySell: state.products.bySell,
  snackbar: state.snackbar
});

export default connect(
  mapStateToProps, {
    getProductsBySell,
    getProductsByArrival,
    openSnackbarAction,
    closeSnackbarAction
  })(Home);