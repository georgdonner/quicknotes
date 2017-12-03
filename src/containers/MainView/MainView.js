import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import MainRouter from './mainRouter';

class MainView extends Component {
  componentDidMount() {
    if (this.props.user && window.matchMedia('(min-width: 1200px)').matches) {
      this.props.toggleSidebar();
    }
  }

  render() {
    const mainViewStyles = {
      position: 'absolute',
      top: '60px',
      left: '240px',
      transition: 'all .1s linear',
      width: '100%',
      height: 'calc(100vh - 60px)',
    };
    let sidebar;
    if (this.props.user) {
      sidebar = (<Sidebar />);
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
          <MainRouter />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sidebar: state.sidebar.open,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  toggleSidebar: () => dispatch(actions.toggleSidebar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
