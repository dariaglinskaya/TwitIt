import './index.css';
import './App.css';
import '../src/components/style.css';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Body from './components/Body';
import Home from './components/Home';
import Search from './components/Search';
import RegistrationForm from './components/RegistrationForm';
import User from './components/User';

import registerServiceWorker from './registerServiceWorker';
import store from "./store";

interface IStateProps {
  isUserAuthorized: boolean;
}
interface IActionProps { }

export interface IAppProps extends IStateProps, IActionProps { }

export default class App extends React.Component<IAppProps, {}> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  public render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/searchUser" component={Search} />
            <Route path="/newsFeed" component={Body} />
            <Route path="/register" component={RegistrationForm} />
            <Route path="/user/:username" component={User} />
          </Switch>
        </Router >
      </div>
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