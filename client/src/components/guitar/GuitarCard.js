import React, { Fragment, Component } from 'react'

import { Link } from 'react-router-dom';

// Style 
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

// Button
import Button from '@material-ui/core/Button';

import SnackBarComponent from '../snack-bar/SnackBar';

// Card
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import image from '../../assets/img/guitar.jpg'
import CardActions from '@material-ui/core/CardActions';

// List
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


// Icon
import MoneyIcon from '@material-ui/icons/AttachMoney';


// Redux
import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions/user_actions';
import { openSnackbarAction, closeSnackbarAction } from '../../redux/actions/snackbar_action';


const styles = theme => ({
  card: {
    margin: theme.spacing.unit,
  },
  media: {
    objectFit: 'cover',
  },
  priceIcon: {
    fontSize: '16px',
  },
  list: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
});

class GuitarCard extends Component {

  onClickaddToCart = async () => {
    console.log('add to card click');
    if (this.props.user.userData.isAuth) {
      await this.props.addToCart(this.props.id);
      this.props.openSnackbarAction(`Added ${this.props.name} To Cart Successfully!!! `);
    } else {
      console.log('you need to login')
    }
  }

  render() {
    const { classes, name, price, brand, id, images } = this.props;
    const { msg, open } = this.props.snackbar;
    return (
      <Fragment>
        <Card className={classes.card} >
          <CardMedia
            component='img'
            className={classes.media}
            src={images ? images.url : image}
            title='guitar'
          />
          <CardContent>
            <List>
              <ListItem>
                <Typography variant='body1'>{brand} {name}</Typography>
              </ListItem>
              <ListItem className={classes.list}>
                <Typography variant='body1'>Price: {price}</Typography>
                <MoneyIcon className={classes.priceIcon} />
              </ListItem>
            </List>
          </CardContent>
          <CardActions>
            <Button
              component={Link}
              to={`/product-detail/${id}`}
              style={{ textDecoration: 'none' }}
              size='small'
              color='primary'
            >
              View
              </Button>
            <Button
              size='small'
              color='primary'
              onClick={() => this.onClickaddToCart()}
            >
              Add To Card
              </Button>

          </CardActions>
        </Card>
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
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  snackbar: state.snackbar
});

export default connect(
  mapStateToProps,
  {
    addToCart,
    openSnackbarAction,
    closeSnackbarAction
  }
)(withStyles(styles)(GuitarCard));
