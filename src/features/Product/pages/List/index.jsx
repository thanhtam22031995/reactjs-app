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
import CloseIcon from '@material-ui/icons/Close';
import { Skeleton } from '@material-ui/lab';
import productApi from 'api/productApi';
import { addToCart } from 'features/Cart/cartSlice';
import { cartItemsSelector } from 'features/Cart/selector';
import Filters from 'features/Product/components/Filters';
import PagePagination from 'features/Product/components/Pagination';
import RenderList from 'features/Product/components/RenderList';
import SortProduct from 'features/Product/components/Sort';
import SortByPrice from 'features/Product/components/SortByPrice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

ProductList.propTypes = {};

function ProductList(props) {
  const cartItems = useSelector(cartItemsSelector);
  const history = useHistory();
  const [productList, setProductList] = useState([]);
  const searchTerm = useSelector((state) => state.product.searchTerm);
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 9,
    _sort: 'updatedAt',
    _order: 'desc',
  });
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState('');
  const [pagination, setPagination] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data, pagination } = await productApi.getAll(filters);
        setProductList(data);
        setPagination(pagination);

        setLoading(false);
      } catch (error) {
        console.log('Failed to fecth product list', error);
      }
    })();
  }, [filters]);

  useEffect(() => {
    if (!!searchTerm.q) {
      setCategories('');
      setFilters((x) => ({ ...x, ...searchTerm }));
    }
    if (!searchTerm.q) {
      setCategories('');
      setFilters({
        _page: 1,
        _limit: 9,
        _sort: 'updatedAt',
        _order: 'desc',
      });
    }
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem('cart_item', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleOnClick = (product) => {
    history.push(`products/${product.id}`);
  };
  const handleOnEdit = (product) => {
    history.push(`products/addedit/${product.id}`);
  };
  const handleOnRemove = async (product) => {
    try {
      const message = `Do you really want to remove product named: ${product.name}?`;
      if (window.confirm(message)) {
        await productApi.remove(product.id);
        setFilters((x) => ({ ...x }));
      }
    } catch (error) {
      console.log('Failed to remove remove product', error);
    }
  };
  const handleCategoryClick = (category) => {
    setCategories(category.value);
    setPagination((x) => ({ ...x, _page: 1 }));
    setFilters({
      _page: 1,
      _limit: 9,
      _sort: 'updatedAt',
      _order: 'desc',
      categoryId: category.value,
    });
  };

  const handleOnPageChange = (newPage) => {
    setFilters({ ...filters, _page: newPage });
  };

  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(Slide);

  const handleAddToCartClick = (product) => {
    setTransition(() => transition);
    setOpen(true);

    const action = addToCart({ product, quantity: 1 });
    dispatch(action);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleMoveTocart = () => {
    history.push('/cart');
  };
  const handleSortFormSubmit = (values) => {
    setFilters((x) => ({ ...x, _sort: values }));
  };
  const handleSortByPriceSubmit = (value) => {
    if (value.sortPrice[1] < 10000000) {
      setFilters((x) => ({
        ...x,
        salePrice_gte: value.sortPrice[0],
        salePrice_lte: value.sortPrice[1],
      }));
    }
    setFilters((x) => ({
      ...x,
      salePrice_gte: value.sortPrice[0],
      salePrice_lte: 100000000,
    }));
  };

  const sortProp = { _sort: '' };
  return (
    <div>
      <Box height="5px">{loading && <LinearProgress />}</Box>
      <Container fixed>
        <Box mt={2} display="flex" alignItems="flex-start">
          <Box>
            <Filters categories={categories} filters={filters} onClick={handleCategoryClick} />
            <Box mt={2} ml={-1.5}>
              <SortProduct initialValues={sortProp} onSubmit={handleSortFormSubmit} />
            </Box>
            <Box mt={2} ml={-1.5}>
              <SortByPrice defaultValues={[0, 2000000]} onSubmit={handleSortByPriceSubmit} />
            </Box>
          </Box>

          {loading ? (
            <Grid spacing={2} container>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                <Grid item key={number} style={{ marginTop: 10, marginLeft: 10 }}>
                  <Skeleton variant="rect" width={335} height={358} />
                  <Box pt={0.5}>
                    <Skeleton width="70%" />
                    <Skeleton width="20%" />
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box width="100%">
              <RenderList
                productList={productList}
                onClick={handleOnClick}
                onRemove={handleOnRemove}
                onEdit={handleOnEdit}
                loading={loading}
                onClickAddToCart={handleAddToCartClick}
              />
            </Box>
          )}
        </Box>
        <Box mt={2} mb={5} display="flex" justifyContent="center">
          <PagePagination pagination={pagination} onChange={handleOnPageChange} />
        </Box>

        <Snackbar
          open={open}
          onClose={handleClose}
          TransitionComponent={transition}
          message="A new product has been added to cart!"
          key={transition ? transition.name : ''}
          action={
            <React.Fragment>
              <Button variant="contained" color="primary" size="small" onClick={handleMoveTocart}>
                Move To Cart
              </Button>
              <IconButton aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </React.Fragment>
          }
        />
      </Container>
    </div>
  );
}

export default ProductList;
