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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addToCart, changePromotion, clearCart, removeAllFromCart } from './cartSlice';
import Promotion from './components/Promotion';
import {
  cartItemsSelector,
  itemsCountSelector,
  promotionSelector,
  totalSelector,
} from './selector';

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
  cancelBtn: {
    color: 'white',
    backgroundColor: '#e74c3c',
    '&:hover': {
      backgroundColor: '#c0392b',
    },
  },
  address: {
    color: '#7f8c8d',
    fontSize: 14,
  },
  promo: {
    fontSize: 14,
  },
});
const CITY_MAP = {
  hcm: 'Tp.HCM',
  hn: 'Hà Nội',
  tth: 'Thừa Thiên Huế',
  dn: 'Đà Nẵng',
  nt: 'Nha Trang',
  dl: 'Đà Lạt',
};
const codes = [
  { label: 'Discount 10% and free ship', value: 10 },
  { label: 'Discount 15% and receive a gift', value: 15 },
  { label: 'Discount 20% and get a card', value: 20 },
  { label: 'Discount 30% only', value: 30 },
];
function CartFeature(props) {
  const cartItems = useSelector(cartItemsSelector);
  const promotion = useSelector(promotionSelector);
  const totalAmount = useSelector(totalSelector);
  const itemsCount = useSelector(itemsCountSelector);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const contacts = useSelector((state) => state.contact.contacts);

  const handleIncreaseClick = (item) => {
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

  const handleOnChangeAddressClick = () => {
    history.push('/contact');
  };

  useEffect(() => {
    localStorage.setItem('cart_item', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleProceedClick = () => {
    history.push('/payment');
  };

  const handleContinueShoppingClick = () => {
    history.push('/products');
  };

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(codes[0]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    const action = changePromotion(value.value);
    dispatch(action);
  };
  const handleOnProductClick = (item) => {
    history.push(`/products/${item.product.id}`);
  };

  return (
    <Container fixed>
      <Box mt={2} display="flex" justifyContent="flex-start" alignItems="flex-end">
        <Typography className={classes.desc1}>Cart</Typography>
        <Typography className={classes.desc}>({itemsCount} products)</Typography>
      </Box>
      <Promotion selectedValue={selectedValue} open={open} onClose={handleClose} />
      {!itemsCount && (
        <Box mt={10} height="500px" width="100%">
          <Box margin={2}>
            <img src="https://salt.tikicdn.com/desktop/img/mascot@2x.png" alt="" />
            <Typography style={{ marginTop: 20 }}>
              There are no product in your shopping cart!
            </Typography>

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
      <Grid container>
        <Grid item xs={12} md={9}>
          {cartItems.map((item) => (
            <Card key={item.product.id} className={classes.root}>
              <CardActionArea className={classes.image}>
                <CardMedia
                  onClick={() => handleOnProductClick(item)}
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
                className={classes.cancelBtn}
              >
                Cancel Order
              </Button>
            </Box>
          )}
        </Grid>
        {!!itemsCount && (
          <Grid item xs={12} md={3}>
            <Box mt={2.5} mb={20}>
              <Card
                className={classes.card}
                style={{ flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                  <Typography>Receive Address</Typography>
                  <Button onClick={handleOnChangeAddressClick} color="primary">
                    Change
                  </Button>
                </Box>
                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                  <Typography>{contacts.name}</Typography>
                  {!!contacts.name && <Typography>|</Typography>}
                  <Typography>{contacts.phone}</Typography>
                </Box>
                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                  <Typography className={classes.address}>
                    {contacts.address} - {CITY_MAP[contacts.city]}
                  </Typography>
                </Box>
              </Card>
              <Card
                className={classes.card}
                style={{ height: '85px', flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <Box width="100%" display="flex" justifyContent="space-between">
                  <Typography>Promotion</Typography>

                  <Typography className={classes.promo}>{selectedValue.label}</Typography>
                </Box>
                <Box onClick={handleClickOpen}>
                  <Typography className={classes.promote}>
                    <CardGiftcardIcon />
                    Select promotion code
                  </Typography>
                </Box>
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
                  <Typography style={{ color: '#e74c3c', fontSize: 18 }}>
                    {currencyFormat((totalAmount * (100 - promotion)) / 100)}
                  </Typography>
                </Box>
                <Box width="100%" display="flex" justifyContent="flex-end">
                  <Typography style={{ color: '#7f8c8d', fontSize: 12 }}>
                    (Including VAT if any)
                  </Typography>
                </Box>
              </Card>
              <Box mt={2}>
                <Button onClick={handleProceedClick} color="primary" variant="contained" fullWidth>
                  proceed order
                </Button>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default CartFeature;
