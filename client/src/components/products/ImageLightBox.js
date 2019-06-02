import React, { Component } from 'react'
import LightBox from 'react-images';


class ImageLightBox extends Component {

  state = {
    lightBoxIsOpen: true,
    curImage: this.props.pos,
    images: [],

  }

  static getDerivedStateFromProps(props, state) {
    if (props.images) {
      const images = [];
      props.images.forEach(element => {
        images.push({ src: `${element}` });
      });
      return state = {
        images
      }
    }
    return false;
  }

  closeLightBox = () => {
    this.props.onClose();
  }

  gotoNext = () => {
    this.setState({
      curImage: this.state.curImage + 1
    })
  }

  gotoPrevious = () => {
    this.setState({
      curImage: this.state.curImage - 1
    })
  }


  render() {
    // console.log(this.state.images)

    return (
      <LightBox
        currentImage={this.state.curImage}
        images={this.state.images}
        isOpen={this.state.lightBoxIsOpen}
        onClickPrev={() => this.gotoPrevious()}
        onClickNext={() => this.gotoNext()}
        onClose={() => this.closeLightBox()}
      />
    )
  }
}



export default ImageLightBox;