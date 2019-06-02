import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { MenuList, Typography, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Icon
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountIcon from '@material-ui/icons/AccountCircle';
import UserIcon from '@material-ui/icons/VerifiedUser';
import CartIcon from '@material-ui/icons/ShoppingCart';

import { connect } from 'react-redux';

const links = [
  {
    name: 'My account',
    linkTo: 'user/dashboard',
  },
  {
    name: 'User infomation',
    linkTo: 'user/user-profile',
  },
  {
    name: 'My Cart',
    linkTo: 'user/cart',
  }
];

const styles = theme => ({
  background: {
    backgroundColor: '#F4F4F4',
  },
  grid: {

    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  }
})

const UserLayout = (props) => {

  const { classes } = props;



  const renderAdmin = (

    props.user.isAdmin ?
      (
        <div>
          <h3>ADMIN</h3>
          <Paper style={{ marginTop: '8px' }}>
            <MenuList>
              <MenuItem component={Link} to='/admin/site-info'>
                <ListItemIcon>
                  <AccountIcon />
                </ListItemIcon>
                <Typography> Site Info </Typography>
              </MenuItem>
              <MenuItem component={Link} to='/admin/add-product'>
                <ListItemIcon>
                  <UserIcon />
                </ListItemIcon>
                <Typography> Add Product </Typography>
              </MenuItem>
              <MenuItem component={Link} to='/admin/manage-categories'>
                <ListItemIcon>
                  <CartIcon />
                </ListItemIcon>
                <Typography> Manage Categories </Typography>
              </MenuItem>
            </MenuList>
          </Paper>
        </div>
      )
      : null
  );

  return (
    <div className={classes.background}>
      <Grid container spacing={8} zeroMinWidth className={classes.grid}>
        <Grid item xs md={2}></Grid>
        <Grid item xs={4} md={2} >
          <div>
            <h3> My Account </h3>
            <Paper>
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
                  <Typography> User Infomation </Typography>
                </MenuItem>
                <MenuItem component={Link} to='user/cart'>
                  <ListItemIcon>
                    <CartIcon />
                  </ListItemIcon>
                  <Typography> My Cart </Typography>
                </MenuItem>
              </MenuList>
            </Paper>
          </div>

          {renderAdmin}
        </Grid>


        <Grid item xs={6} md={6} >
          {props.children}
        </Grid>
        <Grid item xs md={2}></Grid>
      </Grid>
    </div>
  );

}

const mapStateToProps = (state) => ({
  user: state.user.userData
})

export default connect(mapStateToProps)(withStyles(styles)(UserLayout));