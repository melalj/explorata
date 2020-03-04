/* eslint-disable react/prop-types */ // TODO: Use prop types

import React from 'react';
import { connect } from 'react-redux';

import { screens } from '../constants';

import Dropfiles from './Dropfiles';
import Loading from './Loading';
import Dashboard from './Dashboard';
import Instructions from './Instructions';

class App extends React.Component {
  getCurrentScreen() {
    const { currentScreen } = this.props;
    if (currentScreen === screens.INSTRUCTIONS) return <Instructions />;
    if (currentScreen === screens.DASHBOARD) return <Dashboard />;
    return <Dropfiles />;
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div className="App">
        {isLoading ? <Loading /> : null}
        {this.getCurrentScreen()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    currentScreen: state.currentScreen
  };
}

export default connect(mapStateToProps)(App);
