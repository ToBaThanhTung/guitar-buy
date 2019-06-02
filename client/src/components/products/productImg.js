import React, { Component } from 'react'
import NoImage from '../../assets/img/noImage.png';
import { withStyles } from '@material-ui/core/styles';
import ImageLightBox from './ImageLightBox';

const styles = theme => ({
  mainPic: {
    width: '100%',
    height: '446px',
    border: '1px solid #d9d9d9',
    backgroundSize: 'cover !important',
    backgroundPosition: 'center center !important',
  },
  productImgContainer: {
    marginTop: '30px',
    paddingRight: '50px'
  },
  thumb: {
    cursor: 'pointer',
    height: '150px',
    width: '33.3%',
    backgroundSize: 'cover !important',
    backgroundPosition: 'bottom center !important',
    border: '1px solid #e8e8e8',
    float: 'left',
    boxSizing: 'border-box'
  }
})



class productImg extends Component {
  state = {
    lightBox: false,
    imagePos: 0,
    lightBoxImages: [],

  };

  componentDidMount = () => {
    // no need light box if no image
    if (this.props.detail.images.length > 0) {
      let lightBoxImages = [];

      this.props.detail.images.forEach(item => {
        lightBoxImages.push(item.url);
      });

      this.setState({
        ...this.state,
        lightBoxImages: lightBoxImages
      });

    }
  }


  renderCardImage = (images) => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return NoImage;
    }
  }

  handleLightBox = pos => {
    if(this.state.lightBoxImages.length > 0) {
      this.setState({
        lightBox: true,
        imagePos: pos,
      });
    }
  }

  handleLightBoxClose = () => {
    this.setState({
      ...this.state,
      lightBox: false
    });
  }



  render() {

    const { detail, classes } = this.props;
    const showThumbs = () => (
      this.state.lightBoxImages.map((item, i) => (
        i > 0 ?
          <div
            key={i}
            onClick={() => this.handleLightBox(i)}
            className={classes.thumb}
            style={{ background: `url(${item}) no-repeat` }}

          >
          </div> : null
      )
    ))

    return (
      <div className={classes.productImgContainer}>
        <div
          className={classes.mainPic}
          style={{ background: `url(${this.renderCardImage(detail.images)})` }}
          onClick={() => this.handleLightBox(0)}
        />
        <div style={{ marginTop: '10px' }}>
          {showThumbs()}
        </div>

        {
          this.state.lightBox ? 
            <ImageLightBox 
              id={detail.id}
              images={this.state.lightBoxImages}
              open={this.state.open}
              pos={this.state.imagePos}
              onClose={() => this.handleLightBoxClose()}
            />
          : null
        }
      </div>
    )
  }
}

export default withStyles(styles)(productImg);