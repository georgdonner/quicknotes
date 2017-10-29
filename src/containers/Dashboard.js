import React, { Component } from 'react';
import Header from '../components/Header.js';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      notebooks: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/api/notebooks', {
      credentials: 'same-origin'
    }).then((res) => {
      res.json().then((notebooks) => {
        this.setState({
          notebooks: notebooks
        });
      });
    }).catch((err) => {
      console.error(err);
    });
  }

  search(input) {
    console.log(input);
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const body = {
      name: this.state.name
    }
    fetch('/api/notebook', {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body),
      credentials: 'same-origin'
    })
    .then(function (res) {
      res.json().then((data) => {
        console.log('Request succeeded with JSON response', data);
      });
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
  }
            
  render() {
    const notebooks = this.state.notebooks.map((notebook) => 
      <li key={notebook._id}>{notebook.name}</li>
    );
    return (
      <div>
        <Header
          notebook={this.props.match.params.notebook}
          handleSearch={this.search}
        />
        <div className="container">
          <ul>{notebooks}</ul>
          <form onSubmit={this.handleSubmit}>
            <label>
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