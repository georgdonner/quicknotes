import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import SidebarItem from './SidebarItem/SidebarItem';
import './Sidebar.css';

const Sidebar = (props) => {
  const sortByDate = (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt);

  let content;
  if (props.type === 'notebooks' && props.notebooks) {
    content = props.notebooks.sort(sortByDate).map((notebook) => {
      const active = props.activeNotebook && props.activeNotebook._id === notebook._id;
      const url = notebook.notes.length > 0 ? `/note/${notebook.notes[0]._id}` : `/notebook/${notebook._id}`;
      return active ? (
        <SidebarItem active
          key={notebook._id}
          onClick={() => { props.updateType('notes'); }}
          text={notebook.name}
        />
      ) : (
        <SidebarItem
          key={notebook._id}
          url={url}
          text={notebook.name}
        />
      );
    });
  } else if (props.type === 'notes' && props.activeNotebook) {
    content = props.activeNotebook.notes.sort(sortByDate).map((note) => {
      const active = note._id === props.activeNote;
      return (
        <SidebarItem
          key={note._id} active={active}
          url={`/note/${note._id}`} text={note.title}
        />
      );
    });
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
  activeNotebook: state.notebooks.find(notebook => notebook._id === state.selection.notebook),
  activeNote: state.selection.note,
  type: state.sidebar.type,
  open: state.sidebar.open,
});

const mapDispatchToProps = dispatch => ({
  updateType: sidebarType => dispatch(actions.setSidebarType(sidebarType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
