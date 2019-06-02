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
import SnackBarComponent from '../snack-bar/SnackBar';
// redux
import { connect } from 'react-redux';
import { getBrands, getWoods, addBrands } from '../../redux/actions/product_actions'
import { openSnackbarAction, closeSnackbarAction } from '../../redux/actions/snackbar_action';



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


class ManageBrands extends Component {

  state = {
    loading: true,
    brand: '',
    brandError: '',
  }

  onChange = name => (event) => {
    event.preventDefault();
    
    if(event.target.value.length <= 2){
      this.setState({brandError: 'brand name must be >= 3 character'});
    } else this.setState({brandError: ''});

    this.setState({
      [name]: event.target.value,
    });
  }


  componentDidMount() {
    this.getBrands();
  }


  getBrands = async () => {
    try {
      this.setState({ loading: true });
      await this.props.getBrands();
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ loading: false });
    }
  }

  addBrands = async (existingBrands, brandName) => {
    try {
      this.setState({ loading: true });
      await this.props.addBrands(existingBrands, brandName);
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({
        loading: false,
        brand: ''
      }, () => this.getBrands());
    }
  }

  onSubmitAddNewBrands = () => {
    const newBrandsName = { name: this.state.brand };
    this.addBrands(this.props.brands, newBrandsName);
  }


  render() {

    const { classes, brands } = this.props;
    

    return (
      <div>
        <h3>Manage Your Brands</h3>
        <Grid container spacing={8}>
          <Grid item xs md={6} container direction='column'>
            <Grid xs item container direction='row' justify='center'>
              <TextField
                id='outlined-name'
                label='New Brand Name'
                variant='outlined'
                margin='dense'
                value={this.state.brand}
                className={classes.textField}
                onChange={this.onChange('brand')}
                error={this.state.brandError < 3 ? false : true} 
                helperText={this.state.brandError}
              />
            </Grid>
            <Grid item xs container direction='row' justify='center' alignItems='flex-start'>
              <Button onClick={this.onSubmitAddNewBrands}>Submit</Button>
            </Grid>

          </Grid>
          <Grid item xs md={6}>
            {this.state.loading ? <CircularProgress />
              : <List className={classes.root}>
                {brands.map(brand => (
                  <div key={brand._id}>
                    <ListItem>
                      <ListItemText primary={brand.name} />
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

        {
          this.props.snackbar.open ?
            <SnackBarComponent
              msg={this.props.snackbar.msg}
              open={this.props.snackbar.open}
              onClose={this.props.closeSnackbarAction}
              vertical='bottom'
              horizontal='right'
            />
            : null
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  brands: state.products.brands,
  snackbar: state.snackbar
});

export default connect(mapStateToProps, {
  getBrands,
  getWoods,
  addBrands,
  openSnackbarAction,
  closeSnackbarAction,
})(withStyles(styles)(ManageBrands));