import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import ImageUpload from '../upload-image/Image-Uploader';


// frets,...
import { frets, publish, available, shipping } from './utils';

const styles = theme => ({
  textField: {
    marginBottom: theme.spacing.unit,
  },
  menu: {
    width: 200,
  },
  divider: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  }
});



const AddProductComponent = (props) => {
  const { classes, brands, woods, onChange, data, onSubmit, getImages } = props;
  
  return (
    <Fragment>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ImageUpload 
          getImages={getImages}
        />
        <TextField
          id='outlined-name'
          label='Product Name'
          variant='outlined'
          value={data.name}
          className={classes.textField}
          onChange={onChange('name')}
        />
        <TextField
          id='outlined-desc'
          label='Product Description'
          variant='outlined'
          className={classes.textField}
          onChange={onChange('description')}
        />
        <TextField
          id='outlined-price'
          label='Product Price'
          variant='outlined'
          className={classes.textField}
          onChange={onChange('price')}
        />

        <Divider variant='fullWidth' className={classes.divider} />

        <TextField
          id='outlined-select-brand'
          className={classes.textField}
          select
          margin='normal'
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          label='Product Brand'
          variant='outlined'
          onChange={onChange('brand')}
        >
          {brands.map(option => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </TextField>

        <TextField
          id='outlined-select-shipping'
          className={classes.textField}
          select
          margin='normal'
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          label='Shipping'
          variant='outlined'
          onChange={onChange('shipping')}
        >
          {shipping.map(option => (
            <option key={option._id} value={option.value}>
              {option.name}
            </option>
          ))}
        </TextField>

        <TextField
          id='outlined-select-available'
          className={classes.textField}
          select
          margin='normal'
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          label='Available In Stock'
          variant='outlined'
          onChange={onChange('available')}

        >
          {available.map(option => (
            <option key={option._id} value={option.value}>
              {option.name}
            </option>
          ))}
        </TextField>

        <Divider variant='fullWidth' className={classes.divider} />

        <TextField
          id='outlined-select-wood'
          className={classes.textField}
          select
          margin='normal'
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          label='Wood Material'
          variant='outlined'
          onChange={onChange('wood')}
        >
          {woods.map(option => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </TextField>

        <TextField
          id='outlined-select-frets'
          className={classes.textField}
          select
          margin='normal'
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          label='Frets'
          variant='outlined'
          onChange={onChange('frets')}
        >
          {frets.map(option => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </TextField>

        <Divider variant='fullWidth' className={classes.divider} />

        <TextField
          id='outlined-select-publish'
          className={classes.textField}
          select
          margin='normal'
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          label='Publish'
          variant='outlined'
          onChange={onChange('publish')}
          
        >
          {publish.map(option => (
            <option key={option._id} value={option.value}>
              {option.name}
            </option>
          ))}
        </TextField>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button variant='contained' color='primary' onClick={onSubmit}> Submit </Button>
      </div>
    </Fragment>
  )
}

export default withStyles(styles)(AddProductComponent);
