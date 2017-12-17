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
    try {
      const updated = await props.updateNotebook(notebook);
      if (updated) {
        props.history.push('/');
      } else {
        toast.error('Could not update notebook :(', { position: 'bottom-right' });
      }
    } catch (err) {
      toast.error(`Could note update note: ${err.message}`, { position: 'bottom-right' });
    }
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
});

const mapDispatchToProps = dispatch => ({
  updateNotebook: notebook => dispatch(actions.updateNotebook(notebook)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNotebookHandler);
