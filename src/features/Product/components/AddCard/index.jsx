import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

AddToCart.propTypes = {
  onClickAdd: PropTypes.func,
};

const useStyle = makeStyles({
  btn: {
    fontSize: '36px',
    marginLeft: '20px',
    marginRight: '20px',
  },
  text: {
    width: 30,
  },
  atcBtn: {
    marginTop: 10,
  },
});

function AddToCart({ onClickAdd }) {
  const classes = useStyle();
  const [count, setCount] = useState(1);
  const handleDecrease = () => {
    setCount((x) => x - 1);
  };
  const handleIncrease = () => {
    setCount((x) => x + 1);
  };
  const handleAddClick = () => {
    if (onClickAdd) onClickAdd(count);
  };
  return (
    <Box padding={3} display="flex" flexDirection="column" alignItems="flex-start">
      <Box display="flex" justifyContent="flex-start" alignItems="center">
        <Typography>Quantity:</Typography>
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <Button className={classes.btn} disabled={count <= 1} onClick={handleDecrease}>
            -
          </Button>
          <Typography className={classes.text}>{count}</Typography>
          <Button className={classes.btn} onClick={handleIncrease}>
            +
          </Button>
        </Box>
      </Box>

      <Button
        onClick={handleAddClick}
        className={classes.atcBtn}
        variant="contained"
        color="secondary"
      >
        Add To Cart
      </Button>
    </Box>
  );
}

export default AddToCart;
