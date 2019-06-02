import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
  gridList: {
    flexWrap: 'nowrap',
  },
  title: {
    color: 'black',
  },
  titleBar: {
    background: 'none'
  },
});


const ImageHandler = (props) => {
  const { classes, data, onRemoveImage} = props;
  

  return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={4}>
          {data.map(tile => (
            <GridListTile key={tile.public_id}>
              <img src={tile.url} style={{objectFit: 'contain'}} alt=''/>
              <GridListTileBar
                // title={tile.title}
                titlePosition='top'
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton onClick={() => onRemoveImage(tile.public_id)}>
                    <CloseIcon className={classes.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
    </div>
  )
}

ImageHandler.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageHandler);

