import React, { Component } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import DashboardRouter from './dashboardRouter';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      notebooks: [],
      menuOpen: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.state.menuOpen === null) {
      this.setState({ menuOpen: window.matchMedia('(min-width: 1200px)').matches });
    }
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

  toggleMenu() {
    const open = !this.state.menuOpen;
    this.setState({ menuOpen: open });
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
    const mainViewStyles = {
      position: 'absolute',
      top: '60px',
      left: '240px',
      transition: 'left .1s linear',
    };
    mainViewStyles.left = this.state.menuOpen ? '240px' : '0';
    return (
      <div style={{ position: 'relative' }}>
        <Header
          notebook="Quicknotes"
          handleSearch={this.search}
          menuClicked={() => { this.toggleMenu(); }}
        />
        <Sidebar
          notebooks={this.state.notebooks}
          open={this.state.menuOpen}
        />
        <div style={mainViewStyles}>
          <DashboardRouter user={this.props.user} />
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
