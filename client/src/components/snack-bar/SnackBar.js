import React from 'react'

import SnackBar from '@material-ui/core/Snackbar';


const SnackBarComponent = ({ vertical, horizontal, open, onClose, msg }) => {
  return (
    <SnackBar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={onClose}
      autoHideDuration={3000}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{msg}</span>}
    />
  );
}


export default SnackBarComponent;