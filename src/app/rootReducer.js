import cartReducer from 'features/Cart/cartSlice';
import productReducer from 'features/Product/productSlice';
import contactReducer from 'features/Contact/contactSlice';
const rootReducer = {
  cart: cartReducer,
  product: productReducer,
  contact: contactReducer,
};

export default rootReducer;
