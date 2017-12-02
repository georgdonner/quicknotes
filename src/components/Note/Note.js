import React from 'react';
import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';
import './Note.css';

const Note = (props) => {
  const linkRenderer = linkProps => <a href={linkProps.href} target="_blank">{linkProps.children}</a>;
  return (
    <div id="note-container" className="container is-fluid">
      <h1 className="title is-3 has-text-centered">{props.note.title}</h1>
      <h6 id="user-info" className="subtitle is-size-7 has-text-centered has-text-grey">created by {props.note.owner.username}</h6>
      <Markdown
        source={props.note.body} className="content"
        renderers={{ link: linkRenderer }}
      />
      {props.canEdit ? <Link to={`/note/${props.note._id}/edit`}><button className="button is-link">Edit</button></Link> : null}
    </div>
  );
};

export default Note;
