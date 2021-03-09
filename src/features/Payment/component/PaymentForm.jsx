import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import RadioField from 'components/FormField/RadioField';
import { cartItemsSelector } from 'features/Cart/selector';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

PaymentForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};
PaymentForm.defaultProps = {
  initialValues: {},
  onSubmit: null,
};

const useStyle = makeStyles({
  cardDeli: { textAlign: 'start', padding: 25 },
  cardItem: {
    margin: 15,
    padding: 15,
    display: 'flex',
    textAlign: 'start',
  },
  image: {
    width: 100,
  },
  cardPayment: {
    display: 'flex',
    padding: 25,
  },
  cardContent: {
    width: 300,
  },
  btn: {
    marginTop: 20,
    color: '#ecf0f1',
    width: 375,
    fontSize: 20,
    backgroundColor: '#e74c3c',
    '&:hover': {
      backgroundColor: '#c0392b',
    },
  },
});

function currencyFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫';
}

function PaymentForm({ onSubmit }) {
  const cartItems = useSelector(cartItemsSelector);

  const [delivery, setDelivery] = useState('fast');

  const classes = useStyle();

  const schema = yup.object().shape({
    deliveryWay: '',
    paymentWay: '',
  });

  const form = useForm({
    mode: 'onBlur',
    defaultValues: { deliveryWay: 'fast', paymentWay: 'cas' },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (values) => {
    if (onSubmit) onSubmit(values);
  };

  const handleOnDeliveryChange = (value) => {
    setDelivery(value);
  };
  const handleOnPaymentChange = (value) => {};
  return (
    <Container>
      <form noValidate autoComplete="off" onSubmit={form.handleSubmit(handleFormSubmit)}>
        <Box mt={3} textAlign="start">
          <Typography variant="h4">Select Delivery Method</Typography>
          <Card className={classes.cardDeli}>
            <Box>
              <RadioField
                onRadioChange={handleOnDeliveryChange}
                options={[
                  { label: 'Fast Delivery', value: 'fast' },
                  { label: 'Normal Delivery', value: 'normal' },
                ]}
                form={form}
                name="deliveryWay"
                label=""
              />
            </Box>
            {cartItems.map((item) => (
              <Card key={item.product.id} className={classes.cardItem}>
                <CardActionArea className={classes.image}>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    image={item.product.images[0]}
                    title="Contemplative Reptile"
                  />
                </CardActionArea>

                <CardContent className={classes.cardContent}>
                  <Typography variant="body1" component="p">
                    {item.product.name}
                  </Typography>
                  <Box>
                    <Typography variant="body2" component="p">
                      Quantity: x{item.quantity}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Price: {currencyFormat(item.product.salePrice)}
                    </Typography>
                  </Box>
                </CardContent>
                <Box mt={2} width="30%">
                  <Typography>
                    {delivery === 'fast'
                      ? 'Fast Delivery Before 10:00 Today'
                      : 'Delivery Before 10:00 Tomorrow'}
                  </Typography>

                  <Typography>
                    {delivery === 'fast' ? 'Fast Delivery In 2-3 Hours' : 'Normal Delivery'}
                  </Typography>
                </Box>
                <Box>
                  <Typography>{currencyFormat(item.product.salePrice * item.quantity)}</Typography>
                </Box>
              </Card>
            ))}
          </Card>
        </Box>

        <Box mt={3} textAlign="start">
          <Typography variant="h4">Select Payment Method</Typography>
          <Card className={classes.cardPayment}>
            <RadioField
              onRadioChange={handleOnPaymentChange}
              options={[
                { label: 'Cast on delivery', value: 'cas' },
                { label: 'Visa Card, Master Card', value: 'vis' },
                { label: 'Domestic ATM card', value: 'atm' },
                { label: 'MoMo Electronic wallet', value: 'mom' },
                { label: 'ZaloPay Electronic wallet', value: 'zal' },
              ]}
              form={form}
              name="paymentWay"
              label=""
            />
          </Card>
        </Box>
        <Box textAlign="start">
          <Button className={classes.btn} type="submit">
            Buy Now
          </Button>
          <Typography>(Please check your order before confirm)</Typography>
        </Box>
      </form>
    </Container>
  );
}

export default PaymentForm;
