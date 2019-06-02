import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography  from '@material-ui/core/Typography';
import Toolbar  from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid';  
import AddressIcon from '@material-ui/icons/LocationCity';
import WorkingIcon from '@material-ui/icons/AccessTime';

const styles = theme => ({
  footer: {
    bottom: 0,
    height: theme.spacing.unit * 25,
    background: 'white',
  },
  brand: {
    justifyContent: 'center',
  },

  contact: {
    display: 'flex',
    justifyContent: 'center',
  }


});

const FooterComponent = (props) => {
  const { classes } = props;

  return(
    <div>
      <AppBar className={classes.footer} position='relative'>
        <Toolbar className={classes.brand} disableGutters>
          <Typography  variant='title'> GuitarBuy </Typography>
        </Toolbar>
        <Divider variant='middle' />
       
        <Grid zeroMinWidth container spacing={8} className={classes.contact}>
          

          <Grid item xs={2}></Grid>
          
          <Grid item xs={4}>
            <Typography variant='h5'>Be the first to know</Typography>
            <Typography variant='body1'>
                <AddressIcon/>             
                12, Sư Vạn Hạnh, Quận 10, TPHCM.
            </Typography>
            <Typography variant='body1'>
                <WorkingIcon/>             
                From 8am to 9pm.
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant='h5'>Be the first to know</Typography>
            <Typography variant='body1'>
                <AddressIcon/>             
                12, Sư Vạn Hạnh, Quận 10, TPHCM.
            </Typography>
            <Typography variant='body1'>
                <WorkingIcon/>             
                From 8am to 9pm.
            </Typography>
          </Grid>

          <Grid item xs={2}></Grid>
         
     
         
        </Grid>
      </AppBar>
    </div>
  );

}


export default withStyles(styles)(FooterComponent);