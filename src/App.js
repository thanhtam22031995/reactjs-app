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
        <Route exact path="/" component={HomeFeature}></Route>
        <Route path="/products" component={ProductFeature}></Route>
        <Route path="/cart" component={CartFeature}></Route>
      </Switch>
    </div>
  );
}

export default App;
