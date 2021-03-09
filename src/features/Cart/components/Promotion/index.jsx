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

const codes = [
  { label: 'Discount 10% and free ship', value: 10 },
  { label: 'Discount 15% and receive a gift', value: 15 },
  { label: 'Discount 20% and get a card', value: 20 },
  { label: 'Discount 30% only', value: 30 },
];

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
          <ListItem button onClick={() => handleListItemClick(code)} key={code.label}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <CardGiftcardIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={code.label} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default Promotion;
