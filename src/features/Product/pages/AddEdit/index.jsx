import { Box, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import productApi from '../../../../api/productApi';
import AddEditForm from '../../components/AddEditForm';

AddEdit.propTypes = {};

function AddEdit(props) {
  const { params } = useRouteMatch();
  console.log(params);
  const [product, setProduct] = useState({
    name: '',
    shortDescription: '',
    originalPrice: 0,
    isPromotion: '',
    promotionPercent: 0,
    images: [],
    categoryId: '',
    isFreeShip: false,
  });

  useEffect(() => {
    (async () => {
      if (!!params.id) {
        const data = await productApi.getById(params.id);
        setProduct(data);
      }
    })();
  }, [params.id]);

  const propProduct = { ...product, images: product.images.map((x) => ({ name: x })) } || {
    name: '',
    shortDescription: '',
    originalPrice: 0,
    isPromotion: '',
    promotionPercent: 0,
    images: [],
    categoryId: '',
    isFreeShip: false,
  };

  const handleSubmit = async (values) => {
    const newValue = {
      ...values,
      images: !!values.images ? values.images.map((x) => x.name) : [],
      salePrice:
        values.isPromotion === 1
          ? (values.originalPrice * (100 - values.promotionPercent)) / 100
          : values.originalPrice,
    };
    if (!params.id) {
      await productApi.add(newValue);
      return;
    }

    const valueUpdate = { ...newValue, id: params.id };

    await productApi.update(valueUpdate);
  };
  return (
    <Container>
      <Box mt={4}>
        <AddEditForm initialValues={propProduct} onSubmit={handleSubmit} />
      </Box>
    </Container>
  );
}

export default AddEdit;
