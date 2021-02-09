import cartReducer from '../features/Cart/cartSlice';
import productReducer from '../features/Product/productSlice';
const rootReducer = {
  cart: cartReducer,
  product: productReducer,
};

export default rootReducer;
