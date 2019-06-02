import React, { Component } from 'react'
import UserLayout from '../../hoc/user/index';
import AddProductComponent from './AddProductComponent';
import Progress from '../utils/Progress';

// redux
import { connect } from 'react-redux';
import { getBrands, getWoods, addProduct } from '../../redux/actions/product_actions';
import { openSnackbarAction, closeSnackbarAction } from '../../redux/actions/snackbar_action';

// snackbar
import SnackBarComponent from '../../components/snack-bar/SnackBar';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: '',
      description: '',
      price: '',
      brand: '',
      shipping: true,
      available: true,
      wood: '',
      images: [],
      frets: 20,
      publish: true,
    }
  }
  async componentDidMount() {
    await this.props.getBrands();
    await this.props.getWoods();
    this.setState({
      ...this.state,
      brand: this.props.brands[0]._id,
      wood: this.props.woods[0]._id,
      loading: false,
    })
  }

  onChange = name => (e) => {
    e.preventDefault();
    this.setState({
      [name]: e.target.value
    });
  }

  onSubmit = async e => {
    e.preventDefault();
    const data = this.state;
    delete data.loading;
    // console.log(data);
    this.setState({ ...this.state, loading: true });
    await this.props.addProduct(data);
    // this.setState({ ...this.state, openSnackBar: true })
    this.resetForm();
    this.props.openSnackbarAction(' Add Product Successfuly ! ');

  }

  resetForm = () => {
    this.setState({
      loading: false,
      name: '',
      description: '',
      price: '',
      brand: '',
      shipping: true,
      available: true,
      wood: '',
      frets: 20,
      publish: true,
      images: [],
    });
  }

  getImages = (images) => {
    this.setState({
      ...this.state,
      images: images,
    });
  }


  render() {
    const { msg, open } = this.props.snackbar;
    // console.log('debug here: ', this.state);
    
    return (
      <UserLayout>
        {
          this.props.user.isAdmin ?
            <div>
              <h3> Add Product </h3>
              {
                this.state.loading ? <Progress />
                  : <AddProductComponent
                    brands={this.props.brands}
                    woods={this.props.woods}
                    onChange={this.onChange}
                    data={this.state}
                    onSubmit={this.onSubmit}
                    getImages={this.getImages}
                  />
              }
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
            :
            <div>you are not admin!!!</div>
        }
      </UserLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  brands: state.products.brands,
  woods: state.products.woods,
  snackbar: state.snackbar
});

export default connect(mapStateToProps, {
  getBrands,
  getWoods,
  addProduct,
  openSnackbarAction,
  closeSnackbarAction,
})(AddProduct);