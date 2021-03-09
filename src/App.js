import Footer from 'components/Footer';
import ContactFeature from 'features/Contact';
import PaymentFeature from 'features/Payment';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CartFeature from './features/Cart';
import HomeFeature from './features/Home';
import ProductFeature from './features/Product';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={HomeFeature} />
        <Route path="/products" component={ProductFeature} />
        <Route path="/cart" component={CartFeature} />
        <Route path="/contact" component={ContactFeature} />
        <Route path="/payment" component={PaymentFeature} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
