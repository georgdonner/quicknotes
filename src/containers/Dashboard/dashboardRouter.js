import React from 'react';
import { Route } from 'react-router-dom';
import Aux from '../../hoc/Auxiliary';
import NotebookContainer from './Routes/Notebook';

const DashboardRouter = () => (
  <Aux>
    <Route path="/notebook/:notebook" component={NotebookContainer} />
  </Aux>
);

export default DashboardRouter;
