import React, { Component } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      notebooks: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      const result = await axios.get('/api/notebooks', { withCredentials: true });
      this.setState({
        notebooks: result.data,
      });
    } catch (err) {
      console.error(err);
    }
  }

  search(input) {
    console.log(input);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const body = {
      name: this.state.name,
    };
    try {
      const result = await axios.post('/api/notebook', body, {
        withCredentials: true,
      });
      console.log('Notebook successfully created.', result.data);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const notebooks = this.state.notebooks.map(notebook =>
      <li key={notebook._id}>{notebook.name}</li>,
    );
    return (
      <div>
        <Header
          notebook="Quicknotes"
          handleSearch={this.search}
        />
        <div className="container">
          <div>User: {this.props.user.username}</div>
          <ul>{notebooks}</ul>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="input">
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Add Notebook" />
          </form>
        </div>
      </div>
    );
  }
}

export default Dashboard;
