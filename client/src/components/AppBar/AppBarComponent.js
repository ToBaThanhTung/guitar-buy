import React, { Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import UserMenu from './UserMenu';

// icon
import SearchIcon from '@material-ui/icons/Search';
// navigation
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
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
  
  appbar: {
    // background: 'linear-gradient(45deg, #0097EF 30%, #0097EF 90%)',
    // boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    top: 0,
  },
  toolbar: {
    display: 'flex',
    marginLeft: 0,
    marginRight: 0,
    [theme.breakpoints.up('md')] : {
      marginLeft: theme.spacing.unit * 18,
      marginRight: theme.spacing.unit * 18,
    }
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
  }
});

const AppBarComponent = (props) => {
  const { classes, showLinkUser, showLinkPage } = props;
  return (
    <Fragment>
      <AppBar 
        className={classes.appbar} position='relative'> 
        <ToolBar>
          <Grid container> 
            <Grid item xs={false} md={2}></Grid>
            <Grid item xs={3} md={1}> 
              <Button component={Link} to='/'> GuitarBuy </Button>
            </Grid>
            <Grid item xs={7} md={3} > 
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={false} md={1}></Grid>
            <Grid item xs={2} md={3}>
              <div className={classes.button}>
                {/* {showLinkUser.map((item, i) => {
                  return (<Button component={Link} key={i} to={item.linkTo} >{item.name}</Button>)
                })}
                {showLinkPage.map((item, i) => {
                  return (<Button component={Link} key={i} to={item.linkTo} >{item.name}</Button>)
                })} */}
                <UserMenu user={props.user} ></UserMenu>
              </div>
            </Grid>
            <Grid item xs={false} md={2}> </Grid>
          </Grid>
        </ToolBar>
       
      </AppBar>
    </Fragment>
  );
};



export default withStyles(styles)(AppBarComponent);


