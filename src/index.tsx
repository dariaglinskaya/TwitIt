import './index.css';
import './App.css';

import { Provider, connect } from 'react-redux';
// import { fetchTweets } from './actions/app';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Body from './components/Body';
import registerServiceWorker from './registerServiceWorker';
import store from "./store";



export default class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  public render() {
    return (
      <Body />
    );
  }
}

const ConnectedApp = connect((state) => {
  console.log(state);
  return state;
})(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
