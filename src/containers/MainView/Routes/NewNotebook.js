import React from 'react';
import axios from 'axios';

const NewNotebook = () => (
  <button onClick={() => axios.post('/api/notebook', { name: 'Test' })}>New Notebook</button>
);

export default NewNotebook;
