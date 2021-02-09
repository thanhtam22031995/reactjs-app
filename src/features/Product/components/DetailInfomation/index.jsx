import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';

DetailInfomation.propTypes = {
  product: PropTypes.object,
};
DetailInfomation.defaultProps = {
  product: {},
};
const useStyle = makeStyles({
  title: {
    marginBottom: 20,
  },
  desc: {
    marginBottom: 20,
  },
  originalprice: {
    textDecoration: 'line-through',
    color: '#95a5a6',
  },
  salePrice: {
    color: '#e74c3c',
    fontSize: '32px',
  },
});

function currencyFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫';
}
function DetailInfomation({ product }) {
  const classes = useStyle();
  return (
    <Box
      padding={3}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      textAlign="start"
    >
      <Typography className={classes.title} component="h1" variant="h3">
        {product.name}
      </Typography>
      <Typography className={classes.desc}>{product.shortDescription}</Typography>
      {product.isPromotion === 1 && (
        <Typography className={classes.originalprice}>
          {currencyFormat(product.originalPrice || 0)}
        </Typography>
      )}
      <Typography className={classes.salePrice}>
        {currencyFormat(product.salePrice || 0)}
      </Typography>
    </Box>
  );
}

export default DetailInfomation;
