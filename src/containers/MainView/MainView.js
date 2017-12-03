import React from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import MainRouter from './mainRouter';

const MainView = (props) => {
  const mainViewStyles = {
    position: 'absolute',
    top: '60px',
    left: '240px',
    transition: 'all .1s linear',
    width: '100%',
    height: 'calc(100vh - 60px)',
  };
  let sidebar;
  if (props.user) {
    sidebar = (<Sidebar />);
  }
  mainViewStyles.left = props.sidebar ? '240px' : '0px';

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
};

const mapStateToProps = state => ({
  sidebar: state.sidebar.open,
  user: state.user,
});

export default connect(mapStateToProps)(MainView);
