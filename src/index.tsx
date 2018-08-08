import './index.css';
import './App.css';

import { Provider, connect } from 'react-redux';
// import { fetchTweets } from './actions/app';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Body from './components/Body';
import registerServiceWorker from './registerServiceWorker';
import store from "./store";

const tweets = [{
  author: 'admin',
  date: "01.01.2018",
  text: "my first tweet"
},
{
  author: 'batman',
  date: "02.01.2018",
  text: "lorem"
}
];

interface IStateProps {
  isUserAuthorized: boolean;
}
interface IActionProps {}

export interface IAppProps extends IStateProps,IActionProps{}

export default class App extends React.Component<IAppProps, {}> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  public render() {
    return (
      <Body tweets={tweets}/>
    );
  }
}

const ConnectedApp = connect((state) => {
  console.log("State");
  console.log(state);
  console.log("Store");
  console.log(store);
  return state;
})(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();