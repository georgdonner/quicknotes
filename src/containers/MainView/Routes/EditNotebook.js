import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';

import Aux from '../../../hoc/Auxiliary';
import * as actions from '../../../store/actions';
import NotebookForm from '../../../components/NotebookForm/NotebookForm';

const EditNotebookHandler = (props) => {
  const getNotebook = () => (
    props.notebooks.find(notebook => (
      notebook._id === props.match.params.notebook
    ))
  );

  const updateNotebook = async (notebook) => {
    console.log(notebook);
  };

  const notebook = getNotebook();
  return notebook ? (
    <Aux>
      <NotebookForm
        notebook={notebook}
        onSubmit={updateNotebook}
        updating
      />
      <ToastContainer />
    </Aux>
  ) : <h1>Something went wrong :(</h1>;
};

const mapStateToProps = state => ({
  notebooks: state.notebooks,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  updateNote: note => dispatch(actions.updateNote(note)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNotebookHandler);
