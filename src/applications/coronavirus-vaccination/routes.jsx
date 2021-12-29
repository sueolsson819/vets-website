import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './components/Layout';
import Introduction from './components/Introduction';
import Form from './components/Form';
import Confirmation from './components/Confirmation';
import Unsubscribe from './components/Unsubscribe';

const routes = (
  <Route path="/">
    <Route component={Layout} key="/main">
      <Route exact path="/" component={Introduction} key="/intro" />
      <Route component={Form} key="/apply" path="/form" />
      <Route
        component={Confirmation}
        key="/confirmation"
        path="/confirmation"
      />
      <Route component={Unsubscribe} path="/unsubscribe" />
    </Route>
  </Route>
);

export default routes;
