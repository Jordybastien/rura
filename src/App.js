import React, { Component } from 'react';
import Router from './router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import middleware from './middleware';

class App extends Component {

  render() {
    const store = createStore(reducer, middleware);
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
