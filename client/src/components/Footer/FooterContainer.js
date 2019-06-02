import React, { Component } from 'react'
import FooterComponent from './FooterComponent';

class FooterContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      isMobile: false,
    };
  }

  render() {
    
    return(
      <div>
        <FooterComponent />
      </div>
    );
  }
}

export default FooterContainer;