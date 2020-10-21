import { Snackbar } from '@material-ui/core';
import React, { useState } from 'react';      

function PioneerSnackbar(props) {

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.setOpen(false);
  };

  const handleExited = () => {
    props.setMessageInfo(undefined);
  };
  
  return (
   <Snackbar
        key={props.messageInfo ? props.messageInfo.key : undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={props.open}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
        message={props.messageInfo ? props.messageInfo.message : undefined}
      />)
 }     



 export default PioneerSnackbar;