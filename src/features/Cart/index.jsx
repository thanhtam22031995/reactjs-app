import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addToCart, clearCart, removeAllFromCart } from './cartSlice';
import { cartItemsSelector, itemsCountSelector, totalSelector } from './selector';

CartFeature.propTypes = {};

function currencyFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫';
}
const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    display: 'flex',
    margin: 20,
    alignItems: 'center',
    padding: 15,
    position: 'relative',
  },
  image: {
    width: '20%',
  },
  desc: {
    fontSize: '14px',
    color: '#7f8c8d',
    padding: '2px',
  },
  desc1: {
    fontSize: '18px',
    fontWeight: '500',
  },
  origiPrice: {
    textDecoration: 'line-through',
    paddingRight: 5,
    color: '#7f8c8d',
    fontSize: '14px',
  },
  salePrice: {
    fontSize: '16px',
    fontWeight: '500',
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 10,

    alignItems: 'center',
  },
  promote: {
    color: '#3498db',
    cursor: 'pointer',
    alignItems: 'center',
    display: 'flex',
    fontSize: 14,
  },
});
function CartFeature(props) {
  const cartItems = useSelector(cartItemsSelector);
  const totalAmount = useSelector(totalSelector);
  const itemsCount = useSelector(itemsCountSelector);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleIncreaseClick = (item) => {
    console.log(item);
    const action = addToCart({
      ...item,
      quantity: 1,
    });
    dispatch(action);
  };
  const handleDecreaseClick = (item) => {
    const action = addToCart({
      ...item,
      quantity: -1,
    });
    dispatch(action);
  };

  const handleRemoveClick = (item) => {
    const message = `Are you sure to remove ${item.product.name}?`;
    if (window.confirm(message)) {
      const action = removeAllFromCart(item);
      dispatch(action);
    }
  };

  const handleRemoveAllCartClick = () => {
    const message = `Are you sure to remove everything in your cart?`;
    if (window.confirm(message)) {
      dispatch(clearCart());
    }
  };

  useEffect(() => {
    localStorage.setItem('cart_item', JSON.stringify(cartItems));
  }, [cartItems]);

  const handlePaymentClick = () => {};

  const handleContinueShoppingClick = () => {
    history.push('/products');
  };

  return (
    <Container fixed>
      <Grid container>
        <Grid item xs={12} md={9}>
          <Box mt={2} display="flex" justifyContent="flex-start" alignItems="flex-end">
            <Typography className={classes.desc1}>Cart</Typography>
            <Typography className={classes.desc}>({itemsCount} products)</Typography>
          </Box>
          {!itemsCount && (
            <Box mt={10} height="500px" width="100%">
              <Box margin={2}>
                <img src="https://salt.tikicdn.com/desktop/img/mascot@2x.png" alt="" />
                <Typography style={{ marginTop: 20 }}>There is no product in your cart!</Typography>

                <Button
                  onClick={handleContinueShoppingClick}
                  style={{ marginTop: 20 }}
                  variant="contained"
                  color="primary"
                >
                  Continue Shopping
                </Button>
              </Box>
            </Box>
          )}
          {cartItems.map((item) => (
            <Card key={item.product.id} className={classes.root}>
              <CardActionArea className={classes.image}>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={item.product.images[0]}
                  title="Contemplative Reptile"
                />
              </CardActionArea>

              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.product.name}
                </Typography>
              </CardContent>
              <Box flexGrow="1" display="flex" justifyContent="flex-end">
                <Box mr={3} display="flex" flexDirection="column" alignItems="flex-end">
                  <Typography className={classes.salePrice}>
                    {currencyFormat(item.product.salePrice)}
                  </Typography>
                  {item.product.isPromotion === 1 && (
                    <Box display="flex">
                      <Typography className={classes.origiPrice}>
                        {currencyFormat(item.product.originalPrice)}
                      </Typography>
                      <Typography variant="body2">| -{item.product.promotionPercent}%</Typography>
                    </Box>
                  )}
                </Box>

                <Button
                  disabled={item.quantity <= 1}
                  onClick={() => handleDecreaseClick(item)}
                  variant="outlined"
                  size="small"
                  color="primary"
                >
                  -
                </Button>

                <Box
                  width="50px"
                  height="50px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid #2980b9"
                  borderRadius="5px"
                >
                  {item.quantity}
                </Box>
                <Button
                  onClick={() => handleIncreaseClick(item)}
                  variant="outlined"
                  size="small"
                  color="primary"
                >
                  +
                </Button>
              </Box>
              <Box position="absolute" top="0" right="0">
                <IconButton onClick={() => handleRemoveClick(item)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Card>
          ))}
          {!!itemsCount && (
            <Box display="flex" width="100%" justifyContent="flex-end">
              <Button
                style={{ marginRight: 20 }}
                onClick={handleRemoveAllCartClick}
                variant="contained"
                color="secondary"
              >
                Cancel Order
              </Button>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <Box mt={8}>
            <Card
              className={classes.card}
              style={{ height: '85px', flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                <Typography>Receive Address</Typography>
                <Button color="primary">Change</Button>
              </Box>
            </Card>
            <Card
              className={classes.card}
              style={{ height: '85px', flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <Typography>Promotion</Typography>
              <Typography className={classes.promote}>
                <CardGiftcardIcon />
                Select promotion code
              </Typography>
            </Card>
            <Card className={classes.card} style={{ height: '60px' }}>
              <Typography variant="body1">Provisional Sum</Typography>
              <Typography>{currencyFormat(totalAmount)}</Typography>
            </Card>
            <Card
              className={classes.card}
              style={{
                height: '80px',
                marginTop: 0,
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Box width="100%" display="flex" justifyContent="space-between">
                <Typography variant="body1">Total Amount</Typography>
                <Typography style={{ color: 'red', fontSize: 18 }}>
                  {currencyFormat(totalAmount)}
                </Typography>
              </Box>
              <Box width="100%" display="flex" justifyContent="flex-end">
                <Typography style={{ color: '#7f8c8d', fontSize: 12 }}>
                  (Including VAT if any)
                </Typography>
              </Box>
            </Card>
            <Box mt={2}>
              <Button onClick={handlePaymentClick} color="primary" variant="contained" fullWidth>
                proceed order
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CartFeature;
