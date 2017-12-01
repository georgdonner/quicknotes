import React from 'react';
import Aux from '../../hoc/Auxiliary';
import './Notebook.css';

const Notebook = (props) => {
  console.log(props.notebook.notes);
  const notes = props.notebook.notes.map(note => (
    <h2 key={note._id}>{note.title}</h2>
  ));

  return (
    <Aux>
      <div id="notebook-container">
        <div id="notebook-topbar">
          <h1 id="notebook-title">{props.notebook.name}</h1>
        </div>
        {notes}
      </div>
    </Aux>
  );
};

export default Notebook;
