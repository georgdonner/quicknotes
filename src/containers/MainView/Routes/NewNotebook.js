import React from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';
import NotebookForm from '../../../components/NotebookForm/NotebookForm';

const NewNotebookHandler = (props) => {
  const addNotebook = async (notebook) => {
    try {
      const created = await props.addNotebook(notebook);
      props.history.push(`/notebook/${created._id}`);
    } catch (error) {
      toast(error, { type: 'error', position: 'bottom-right' });
    }
  };
  return <NotebookForm onSubmit={notebook => addNotebook(notebook)} />;
};

const mapDispatchToProps = dispatch => ({
  addNotebook: notebook => dispatch(actions.addNotebook(notebook)),
});

export default connect(null, mapDispatchToProps)(NewNotebookHandler);
