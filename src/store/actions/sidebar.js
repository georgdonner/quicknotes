import { SET_SIDEBAR, TOGGLE_SIDEBAR, SET_SIDEBAR_TYPE } from './actionTypes';

export const setSidebar = open => ({
  type: SET_SIDEBAR,
  open,
});

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
});

export const setSidebarType = sidebarType => ({
  type: SET_SIDEBAR_TYPE,
  sidebarType,
});
