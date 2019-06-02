import React, { Component } from 'react'
import AppBarContainer from '../../components/AppBar/AppBarContainer';
import FooterContainer from '../../components/Footer/FooterContainer';


class Layout extends Component {
  render() {
    return (
      <div >
        <AppBarContainer />
        <div>
          {this.props.children}
        </div>
        <FooterContainer />
      </div>
    );
  }
}

export default Layout;