import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Slide,
  Snackbar,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import productApi from '../../../../api/productApi';
import ImageSelector from '../../../../components/ImageSelector';
import { addToCart } from '../../../Cart/cartSlice';
import { cartItemsSelector } from '../../../Cart/selector';
import AddToCart from '../../components/AddCard';
import DetailDescription from '../../components/Description';
import DetailInfomation from '../../components/DetailInfomation';
import CloseIcon from '@material-ui/icons/Close';

ProductDetail.propTypes = {};

function ProductDetail(props) {
  const cartItems = useSelector(cartItemsSelector);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const { params } = useRouteMatch();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await productApi.getById(params.id);

      setProduct(data);
      setLoading(false);
    })();
  }, [params.id]);

  const handleAddToCartClick = (count) => {
    setTransition(() => transition);
    setOpen(true);
    const action = addToCart({
      product: product,
      quantity: count,
    });
    dispatch(action);
  };
  useEffect(() => {
    localStorage.setItem('cart_item', JSON.stringify(cartItems));
  }, [cartItems]);

  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(Slide);

  const handleClose = () => {
    setOpen(false);
  };
  const handleMoveTocart = () => {
    history.push('/cart');
  };

  return (
    <Container fixed>
      {loading && <LinearProgress />}
      {loading ? (
        <Box mt={5}>
          <Grid container>
            <Box mr={2}>
              <Skeleton variant="rect" width={150} height={150} />
              <Skeleton variant="rect" width={150} height={150} />
              <Skeleton variant="rect" width={150} height={150} />
              <Skeleton variant="rect" width={150} height={150} />
            </Box>
            <Box mr={2}>
              <Skeleton variant="rect" width={630} height={600} />
            </Box>
            <Grid item>
              <Box ml={2} width="100%">
                <Skeleton width={350} height={60} />
                <Skeleton width="60%" height={40} />
                <Skeleton width="40%" height={40} />
                <Skeleton width="60%" height={40} />
                <Skeleton width="50%" height={40} />
                <Skeleton width="60%" height={40} />
                <Skeleton width="60%" height={40} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box paddingBottom={10} mt={2} borderBottom="1px solid #ecf0f1">
          <Grid container>
            <Grid item lg={8} md={12}>
              <Box mt={2} width="100%" borderRight="1px solid #ecf0f1">
                <ImageSelector imageList={product.images} />
              </Box>
            </Grid>
            <Grid item lg={4} md={12}>
              <Box height="500px" mt={2}>
                <DetailInfomation product={product} />

                <AddToCart onClickAdd={handleAddToCartClick} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      <Box mt={15} mb={10}>
        <DetailDescription product={product} />
      </Box>

      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        message="Sản Phẩm Đã Được Thêm Vào Giỏ Hàng"
        key={transition ? transition.name : ''}
        action={
          <React.Fragment>
            <Button variant="contained" color="primary" size="small" onClick={handleMoveTocart}>
              Go To Cart
            </Button>
            <IconButton aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </Container>
  );
}

export default ProductDetail;
