import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Sidebar.css';

const Sidebar = (props) => {
  let content;
  if (props.type === 'notebooks' && props.notebooks) {
    content = props.notebooks.map((notebook) => {
      const active = props.activeNotebook && props.activeNotebook._id === notebook._id;
      const url = notebook.notes.length > 0 ? `/note/${notebook.notes[0]._id}` : `/notebook/${notebook._id}`;
      return active ? (
        <div key={notebook._id} onClick={() => { props.updateType('notes'); }} >
          <li className="notebook active">{notebook.name}</li>
        </div>
      ) : (
        <Link to={url} key={notebook._id}>
          <li className="notebook">{notebook.name}</li>
        </Link>
      );
    });
  } else if (props.type === 'notes' && props.activeNotebook) {
    content = props.activeNotebook.notes.map(note => (
      <Link to={`/note/${note._id}`} key={note._id}>
        <li className="notebook">{note.title}</li>
      </Link>
    ));
  }

  let closeButton;
  if (props.type === 'notes') {
    closeButton = (
      <span className="icon is-small" id="close-button" onClick={() => { props.updateType('notebooks'); }} >
        <i className="fa fa-times" />
      </span>
    );
  }

  const sidebarPos = {
    left: 0,
  };
  if (!props.open) sidebarPos.left = '-240px';

  return (
    <span id="sidebar" style={sidebarPos}>
      {closeButton}
      <h3 className="sidebar-header">{props.type}</h3>
      <ul>
        {content}
      </ul>
    </span>
  );
};

const mapStateToProps = state => ({
  notebooks: state.notebooks,
  activeNotebook: state.notebook,
  type: state.sidebarType,
  open: state.sidebar,
});

const mapDispatchToProps = dispatch => ({
  updateType: sidebarType => dispatch({ type: 'UPDATE_SIDEBAR_TYPE', sidebarType }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
