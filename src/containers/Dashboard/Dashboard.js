import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      const result = await axios.post('/api/notebook', body);
      console.log('Notebook successfully created.', result.data);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const mainViewStyles = {
      position: 'absolute',
      top: '60px',
      left: '240px',
      transition: 'left .1s linear',
      width: '100%',
      height: 'calc(100vh - 60px)',
    };
    let sidebar;
    if (this.props.user) {
      sidebar = (<Sidebar
        notebooks={this.props.notebooks}
        open={this.props.sidebar}
      />);
    }
    mainViewStyles.left = this.props.sidebar ? '240px' : '0px';

    if (window.matchMedia('(min-width: 768px)').matches) {
      mainViewStyles.width = `calc(100% - ${mainViewStyles.left})`;
    }

    return (
      <div style={{ position: 'relative' }}>
        <Header
          notebook="Quicknotes"
          handleSearch={value => console.log(value)}
        />
        {sidebar}
        <div style={mainViewStyles}>
          <DashboardRouter />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notebooks: state.notebooks,
  sidebar: state.sidebar,
  user: state.user,
});

export default connect(mapStateToProps)(Dashboard);
