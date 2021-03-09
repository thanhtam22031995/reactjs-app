import { Container } from '@material-ui/core';
import React from 'react';
import PaymentForm from './component/PaymentForm';

PaymentFeature.propTypes = {};

function PaymentFeature(props) {
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  return (
    <Container>
      <PaymentForm onSubmit={handleFormSubmit} />
    </Container>
  );
}

export default PaymentFeature;
