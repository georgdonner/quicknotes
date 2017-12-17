import React from 'react';
import { Route } from 'react-router-dom';

import Aux from '../../hoc/Auxiliary';
import NotebookContainer from './Routes/Notebook';
import NoteContainer from './Routes/Note';
import EditNotebook from './Routes/EditNotebook';
import NewNote from './Routes/NewNote';
import EditNote from './Routes/EditNote';
import NewNotebook from './Routes/NewNotebook';

const MainRouter = () => (
  <Aux>
    <Route path="/notebook/:notebook/edit" component={EditNotebook} />
    <Route path="/notebook/:notebook" exact component={NotebookContainer} />
    <Route path="/note/:note/edit" component={EditNote} />
    <Route path="/note/:note" exact component={NoteContainer} />
    <Route path="/new/notebook" component={NewNotebook} />
    <Route path="/new/note" component={NewNote} />
  </Aux>
);

export default MainRouter;
