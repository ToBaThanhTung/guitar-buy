import React, { Component } from 'react';
import LoginContainer from './components/login/LoginContainer';
import RegisterContainer from './components/register/RegisterContainer';
import UserDashBoardContainer from './components/user-dashboard/UserDashBoardContainer';
import AddProductContainer from './components/admin/AddProductContainer';
import ProductPage from './components/products/ProductPage';
import ShopContainer from './components/shop/ShopContainer';
import HomeContainer from './components/Home/HomeContainer';
import UserCart from './components/user/UserCart';
import theme from './theme/index';
import ManageCategories from './components/admin/ManageCategories';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// HOC
import Layout from './hoc/layout/index';
import Auth from './hoc/authentication/index';


class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Layout>
            <div>
              <Route exact path="/admin/add-product" component={Auth(AddProductContainer, true)} />
              <Route exact path="/admin/manage-categories" component={Auth(ManageCategories, true)} />
              <Route exact path="/user/dashboard" component={Auth(UserDashBoardContainer, true)} />
              <Route exact path="/user/cart" component={Auth(UserCart, true)} />
              <Route exact path="/login" component={Auth(LoginContainer, false)} />
              <Route exact path="/register" component={Auth(RegisterContainer, false)} />
              <Route exact path="/product-detail/:id" component={Auth(ProductPage, null)} />
              <Route exact path="/" component={Auth(HomeContainer, null)} />
              <Route exact path="/shop" component={Auth(ShopContainer, null)} />
            </div>
          </Layout>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
