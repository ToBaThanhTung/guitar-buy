import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
// redux
import { connect } from 'react-redux';
import { getWoods, addWoods } from '../../redux/actions/product_actions'



const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 185,
  },
  grid: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column'
  }
})


class ManageWoods extends Component {

  state = {
    loading: true,
    wood: '',
  }

  onChange = name => (event) => {
    event.preventDefault();
    this.setState({
      [name]: event.target.value,
    })
  }


  componentDidMount() {
    this.getWoods();
  }


  getWoods = async () => {
    try {
      this.setState({ loading: true });
      await this.props.getWoods();
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ loading: false });
    }
  }

  addWoods = async (existingWoods, newWoodsName) => {
    try {
      this.setState({ loading: true });
      this.props.addWoods(existingWoods, newWoodsName);
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ 
        loading: false, 
        wood: '' 
      }, () => this.getWoods());
    }
  }

  onSubmitAddNewWoods = () => {
    const newWoodsName = { name: this.state.wood };
    this.addWoods(this.props.woods, newWoodsName);
  }


  render() {

    const { classes, woods } = this.props;
    console.log(woods);
    
    return (
      <div>
        <h3>Manage Your Woods</h3>
        <Grid container spacing={8}>
          <Grid item xs md={6} container direction='column'>
            <Grid xs item container direction='row' justify='center'>
              <TextField
                id='outlined-name'
                label='New Wood Name'
                variant='outlined'
                margin='dense'
                value={this.state.wood}
                className={classes.textField}
                onChange={this.onChange('wood')}
              />
            </Grid>
            <Grid item xs container direction='row' justify='center' alignItems='flex-start'>
              <Button onClick={this.onSubmitAddNewWoods}>Submit</Button>
            </Grid>

          </Grid>
          <Grid item xs md={6}>
            {this.state.loading ? <CircularProgress />
              : <List className={classes.root}>
                {woods.map(wood => (
                  <div key={wood._id}>
                    <ListItem>
                      <ListItemText primary={wood.name} />
                      <ListItemSecondaryAction>
                        <IconButton>
                          <CloseIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            }
          </Grid>
        </Grid>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  woods: state.products.woods,
  
});

export default connect(mapStateToProps, {
  getWoods,
  addWoods,
})(withStyles(styles)(ManageWoods));