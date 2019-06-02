import React from 'react'
import Slider from 'react-slick';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    height: '100vh'
  },

})

const HomeSlider = (props) => {
  const { classes } = props;
  const slides = [
    {
      img: '/img/featured/guitar2.jpg',
      name: 'Taylor',
      description: 'Custom shop',
      linkTitle: 'Shop now',
      linkTo: '/shop',
    },
    {
      img: '/img/featured/fenderGuitar.png',
      name: 'Fender',
      description: 'Discount',
      linkTitle: 'View offers',
      linkTo: '/shop',
    },
  ]

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }

  const generateSlides = () => (
    slides ?
      slides.map((item, i) => (
        <div key={i}>
          <div
            style={{
              background: `url(${item.img})`,
              height: `100%`,
              objectFit: 'cover'
            }}
          >
            <div className={classes.root} >
              <Typography variant='h3'>{item.name}</Typography>
              <Typography variant='h3'>{item.description}</Typography>
              <Button component={Link} to={item.linkTo}>{item.linkTitle}</Button>
            </div>
          </div>
        </div>
      ))
      : null
  )

  return (
    <div>
      <Slider {...settings}>
        {generateSlides()}
      </Slider>
    </div>
  )
}

export default withStyles(styles)(HomeSlider);
