import React from 'react';
import { Route } from 'react-router-dom';

import Aux from '../../hoc/Auxiliary';
import NotebookContainer from './Routes/Notebook';
import NoteContainer from './Routes/Note';
import NewNote from './Routes/NewNote';
import NewNotebook from './Routes/NewNotebook';

const DashboardRouter = () => (
  <Aux>
    <Route path="/notebook/:notebook" component={NotebookContainer} />
    <Route path="/note/:note" component={NoteContainer} />
    <Route path="/new/notebook" component={NewNotebook} />
    <Route path="/new/note" component={NewNote} />
  </Aux>
);

export default DashboardRouter;
