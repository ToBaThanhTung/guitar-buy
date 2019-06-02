import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  lablel: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',

  },
  margin: {
    marginRight: theme.spacing.unit,
  },
});
const UserDashBoardComponent = (props) => {
  const { classes, initUser, onChange } = props;


  return (
    <div>
      <Paper className={classes.paper}>
        <Typography gutterBottom variant='title'>User Infomation</Typography>
        <Grid container>
          <Grid item xs={3} md={2} className={classes.lablel}>
            <Typography gutterBottom color='textSecondary'> First Name: </Typography>
            <Typography gutterBottom color='textSecondary'> Last Name: </Typography>
            <Typography gutterBottom color='textSecondary'> Email: </Typography>
          </Grid>
          <Grid item xs={6} className={classes.lablel}>
            <Typography gutterBottom>
              {initUser.firstName}
            </Typography>
            <Typography gutterBottom>
              {initUser.lastName}
            </Typography>
            <Typography gutterBottom>
              {initUser.email}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}


export default withStyles(styles)(UserDashBoardComponent);