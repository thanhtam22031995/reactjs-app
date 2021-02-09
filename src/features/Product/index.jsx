import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEdit from './pages/AddEdit';
import ProductDetail from './pages/Detail';
import ProductList from './pages/List';

function ProductFeature(props) {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={ProductList} />
      <Route exact path={`${path}/addedit`} component={AddEdit} />
      <Route path={`${path}/addedit/:id`} component={AddEdit} />
      <Route path={`${path}/:id`} component={ProductDetail} />
    </Switch>
  );
}

export default ProductFeature;
