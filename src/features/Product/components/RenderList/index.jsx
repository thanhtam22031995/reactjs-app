import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React from 'react';

RenderList.propTypes = {
  productList: PropTypes.array,
  onRemove: PropTypes.func,
  onClick: PropTypes.func,
  onClickAddToCart: PropTypes.func,
  onEdit: PropTypes.func,
  loading: PropTypes.bool,
};
RenderList.defaultProps = {
  productList: [],
  onRemove: null,
  onClick: null,
  onEdit: null,
  onClickAddToCart: null,
  loading: false,
};

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    position: 'relative',
    '&:hover $addToCart': {
      opacity: 1,
    },
  },

  addToCart: {
    opacity: 0,
    backgroundColor: '#e74c3c',
    color: 'white',
    transition: '0.4s ease-in-out',
  },

  media: {
    height: 340,
  },
  grid: {
    padding: 10,
  },
  promo: {
    position: 'absolute',
    zIndex: 1,
    top: 0,

    display: 'flex',
    justifyContent: 'center',
    paddingTop: '3px',
    width: '45px',
    height: '45px',

    fontSize: '14px',
    color: 'white',
    backgroundColor: '#d63031',

    borderRadius: '5px',
    clipPath: 'polygon(0 0, 100% 0, 100% 42%, 50% 78%, 0 42%)',
  },
  salePrice: {
    color: '#fe4c50',
    fontSize: '18px',
    fontWeight: 600,
  },
  price: {
    textDecoration: 'line-through',
    fontSize: '14px',
    color: '#fe4c50',
    fontWeight: 400,
  },
  freeShip: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 50,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#3498db',

    fontSize: 15,
    width: '100px',

    clipPath:
      'polygon(0 0, 25% 16%, 50% 0, 75% 15%, 100% 0, 90% 50%, 100% 100%, 75% 85%, 50% 100%, 25% 85%, 0 100%, 10% 50%)',
  },
});
function currencyFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫';
}

function RenderList(props) {
  const { productList, onRemove, onClick, onEdit, onClickAddToCart } = props;
  const classes = useStyles();

  return (
    <Box display="flex" flexWrap="wrap" width="100%">
      <Grid container width="100%">
        {productList.map((product) => (
          <Grid key={product.id} item sm={12} md={6} lg={4} className={classes.grid}>
            <Box width="100%">
              <Card
                onClick={() => {
                  onClick(product);
                }}
                className={classes.root}
              >
                {!!(product.isPromotion === 1) && (
                  <Typography className={classes.promo}>-{product.promotionPercent}%</Typography>
                )}
                {!!product.isFreeShip && (
                  <Typography className={classes.freeShip}>Free Ship</Typography>
                )}

                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={product.images[0]}
                    title={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                  </CardContent>
                  <Box
                    mt={-3}
                    mb={1}
                    paddingBottom={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box padding={1}>
                      <Typography className={classes.salePrice}>
                        {currencyFormat(!!product.salePrice ? product.salePrice : 0)}
                      </Typography>
                    </Box>
                    {product.isPromotion === 1 && (
                      <Typography className={classes.price}>
                        {currencyFormat(product.originalPrice)}
                      </Typography>
                    )}
                  </Box>
                </CardActionArea>

                <Box position="absolute" right="0" top="0">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(product);
                    }}
                    color="primary"
                    component="span"
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
                <Box position="absolute" right="0" top="30px">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(product);
                    }}
                    color="primary"
                    component="span"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Box className={classes.addToCart}>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();

                      onClickAddToCart(product);
                    }}
                    fullWidth
                    color="inherit"
                    style={{ fontWeight: 'bold' }}
                  >
                    Add To Cart
                  </Button>
                </Box>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default RenderList;
