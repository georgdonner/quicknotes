import React from 'react';
import Aux from '../../hoc/Auxiliary';
import './Notebook.css';

const Notebook = props => (
  <Aux>
    <div id="notebook-container">
      <div id="notebook-topbar">
        <h1 id="notebook-title">{props.notebook.name}</h1>
      </div>
    </div>
  </Aux>
);

export default Notebook;
