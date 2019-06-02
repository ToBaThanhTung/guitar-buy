import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AppBarComponent from './AppBarComponent';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class AppBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: [
        {
          name: 'Home',
          linkTo: '/',
          public: true,
        },
        {
          name: 'Guitars',
          linkTo: '/shop',
          public: 'true',
        }
      ],
      user: [
        {
          name: 'My Cart',
          linkTo: '/user/cart',
          public: false,
        },
        {
          name: 'My Account',
          linkTo: '/user/dashboard',
          public: 'false',
        },
        {
          name: 'Log In',
          linkTo: '/register',
          public: 'true',
        },
        {
          name: 'Log Out',
          linkTo: '/user/logout',
          public: 'false',
        }
      ]
    };
  }

  defaultLink = (item, i) => {

    return (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    );
  }

  showLinks = (type) => {
    let list = [];
    if (this.props.user.userData) {
      type.forEach(item => {
        if (!this.props.user.userData.isAuth) {
          if (item.public === true) {
            list.push(item);
          }
        } else {
          if (item.name !== 'Log In') {
            list.push(item)
          }
        }
      });
    }
    return list;
  };

  render() {
    console.log(this.props)
    return (
      this.props.user.isAuth ?
        <div>
          <AppBarComponent />
        </div> :
        <div>
          <AppBarComponent
            user={this.props.user.userData}
            showLinkUser={this.showLinks(this.state.user)}
            showLinkPage={this.showLinks(this.state.page)}
          />
        </div>
    );
  }
}

AppBarContainer.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(AppBarContainer);