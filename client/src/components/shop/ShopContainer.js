import React, { Component } from 'react'

// Component
import CollapseCheckBox from '../collapse-checkbox/CollapseCheckBox';
import CollapseRadio from '../collapse-radio/CollapseRadio';
import { frets, price } from './utils';
import LoadMoreGuitar from '../guitar/LoadMoreCard';

// Material UI
import Grid from '@material-ui/core/Grid';


// Redux
import { connect } from 'react-redux';
import { getBrands, getWoods, getProductsToShop } from '../../redux/actions/product_actions';

class Shop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      limit: 9,
      skip: 0,
      filters: {
        brand: [],
        frets: [],
        wood: [],
        price: [],
      }
    }
  }

  async componentDidMount() {
    await this.props.getBrands();
    await this.props.getWoods();
    await this.props.getProductsToShop(
      this.state.skip,
      this.state.limit,
      this.state.filters,
    );
    this.setState({ loading: false })
  }

  handlePrice = (value) => {
    const data = price;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  }

  handleFilters = (filters, category) => {

    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;

    if (category === 'price') {
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    }

    // trigger
    this.showFilteredResults(newFilters);

    this.setState({
      filters: newFilters,
    });

  }


  showFilteredResults = async (newFilters) => {
    await this.props.getProductsToShop(
      0,
      this.state.limit,
      newFilters,
    );
    this.setState({ skip: 0 });
  }

  loadMoreGuitarCard = async () => {
    console.log('check here');
    
    let skip = this.state.skip + this.state.limit;
    await this.props.getProductsToShop(
      skip,
      this.state.limit,
      this.state.filters,
      this.props.products.toShop
    );
    this.setState({skip});
  }

  render() {

    return (
      this.state.loading ?
        <div>loading</div>
        :
        <div>
          <Grid container spacing={8}>
            <Grid item xs md={2}></Grid>
            <Grid item xs={4} md={2}>
              <CollapseCheckBox
                initState={true}
                title='Brands'
                list={this.props.products.brands}
                handleFilters={(filters) => this.handleFilters(filters, 'brand')}
              />
              <CollapseCheckBox
                initState={true}
                title='Frets'
                list={frets}
                handleFilters={(filters) => this.handleFilters(filters, 'frets')}
              />

              <CollapseCheckBox
                initState={true}
                title='Woods'
                list={this.props.products.woods}
                handleFilters={(filters) => this.handleFilters(filters, 'wood')}
              />

              <CollapseRadio
                initState={true}
                title='Price'
                list={price}
                handleFilters={filters => this.handleFilters(filters, 'price')}
              />

            </Grid>
            <Grid item xs={6} md={6}>
              <LoadMoreGuitar
                products={this.props.products.toShop}
                size={this.props.products.toShopSize}
                limit={this.state.limit}
                loadMore={() => this.loadMoreGuitarCard()}
              />
            </Grid>
            <Grid item md={2} xs ></Grid>
          </Grid>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products
});

export default connect(mapStateToProps, { getBrands, getWoods, getProductsToShop })(Shop);