import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import React from 'react';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';

Promotion.propTypes = {};

const useStyles = makeStyles({
  avatar: {
    backgroundColor: '#487eb0',
  },
});

const codes = ['Discount 10% And Free Ship', 'Discount 20%!'];

function Promotion(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const classes = useStyles();

  const handleListItemClick = (value) => {
    onClose(value);
  };
  return (
    <Dialog fullWidth onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Select Promotion Code</DialogTitle>
      <List>
        {codes.map((code) => (
          <ListItem button onClick={() => handleListItemClick(code)} key={code}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <CardGiftcardIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={code} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default Promotion;
