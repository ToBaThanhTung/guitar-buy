import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import AccountIcon from '@material-ui/icons/AccountCircle';
import UserIcon from '@material-ui/icons/VerifiedUser';
import CartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { logOutUser } from '../../redux/actions/user_actions';


const styles = theme => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});


class UserMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      openAcountMenu: false,
      openMoreMenu: false,
    };
  }

  handleAccountClick = e => {
    const { currentTarget } = e;
    this.setState({
      anchorEl: currentTarget,
      openAcountMenu: !this.state.openAcountMenu,
    });
  }

  handleMoreClick = e => {
    const { currentTarget } = e;
    this.setState({
      anchorEl: currentTarget,
      openMoreMenu: !this.state.openMoreMenu,
    });
  }

  render() {
    const { user, classes } = this.props;
    const { anchorEl, openAcountMenu, openMoreMenu } = this.state;
    console.log(user)
    let cartBadge = 0;
    // FIX LATER
    if (user.cart) {
      cartBadge = user.cart.length;
    }

    const guestMobile = (
      <div className={classes.sectionMobile}>
        <Button size='small' aria-haspopup="true" onClick={this.handleMoreClick}>
          <MoreIcon />
        </Button>
        <Popper open={openMoreMenu} anchorEl={anchorEl}>
          <Paper onClick={this.handleMoreClick}>
            <MenuList>
              <MenuItem component={Link} to='/login'>
                <ListItemIcon>
                  <AccountIcon />
                </ListItemIcon>
                <Typography>Login</Typography>
              </MenuItem>
              <MenuItem component={Link} to='/register'>
                <ListItemIcon>
                  <AccountIcon />
                </ListItemIcon>
                <Typography> Sign In </Typography>
              </MenuItem>
            </MenuList>
          </Paper>
        </Popper>
      </div>
    );

    const guestDesktop = (
      <div className={classes.sectionDesktop}>
        <Button component={Link} to='/login'>Login</Button>
        <Button component={Link} to='/register'>SignUp</Button>
      </div>
    );

    return (
      <Fragment>
        <Button component={Link} to='/user/cart' className={classes.sectionDesktop}>
          <Badge badgeContent={cartBadge} color='secondary'>
            <CartIcon />
          </Badge>
          Cart
        </Button>
        {user.isAuth ? <div>
          <Button onClick={this.handleAccountClick}>
            <AccountIcon />
            {user.firstName}
          </Button>
          <Popper open={openAcountMenu} anchorEl={anchorEl}>
            <Paper onClick={this.handleAccountClick}>
              <MenuList>
                <MenuItem component={Link} to='/user/dashboard'>
                  <ListItemIcon>
                    <AccountIcon />
                  </ListItemIcon>
                  <Typography> My Account</Typography>
                </MenuItem>
                <MenuItem component={Link} to='/user/user-profile'>
                  <ListItemIcon>
                    <UserIcon />
                  </ListItemIcon>
                  <Typography> User Infomation </Typography>flex
              </MenuItem>
                <MenuItem onClick={this.props.logOutUser}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <Typography> Logout </Typography>
                </MenuItem>
              </MenuList>
            </Paper>
          </Popper>
        </div> : <div>
            {guestMobile}
            {guestDesktop}
          </div>}
      </Fragment>
    );
  }

}

UserMenu.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(null, {logOutUser})(withStyles(styles)(UserMenu));