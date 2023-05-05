import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar.component';
import ProductList from './components/product-list.component';
import AddProduct from './components/product-add.component';
import EditProduct from './components/product-edit.component';

export const history: any = createBrowserHistory();

function App() {
  return (
    <div>
      <Navbar />
      <Router history={history}>
        <Switch>
          <Route path="/createproduct" exact>
            <AddProduct />
          </Route>
          <Route path="/editproduct" exact>
            <EditProduct />
          </Route>
          <Route path="/" exact>
            <ProductList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
