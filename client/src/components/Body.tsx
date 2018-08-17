import { Col } from 'antd';
import * as React from 'react';
import AddForm from './AddForm';
import Footer from './Footer';
import Feed from './Feed';
import Header from './Header';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export interface IProps {
  authentication: any;
}

export class Body extends React.Component<IProps, {}>{
  public render() {
    return (
      !this.props.authentication.loggedIn ? (<Redirect to="/" />) :
        <div className='App-body' >
          <Header />
          <div>
            <Col span={17} push={7}>
              <Feed />
            </Col>
            <Col span={7} pull={17}>
              <AddForm />
            </Col>
          </div>
          <Footer />
        </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    authentication: state.authentication,
  };
};

export default connect(mapStateToProps)(Body);
