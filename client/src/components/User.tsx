import { Col, Icon} from 'antd';
import * as React from 'react';
import Footer from './Footer';
import Header from '../containers/Header';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import UserFeed from '../containers/UserFeed';

export interface IProps {
    authentication: any;
    tweets: any;
    match: any;
    renderUserTweets: any;
}

export class User extends React.Component<IProps, {}>{
    private customStyle = {
        display: 'inline',
    };
    
    public render() {        
        return (
            !this.props.authentication.loggedIn ? (<Redirect to="/" />) :
                <div className='App-body' >
                    <Header />
                    <div>
                        <Col span={17} push={7}>
                            < UserFeed />
                        </Col>
                        <Col span={7} pull={17}>
                            <div className="user-page">
                                <Icon type="user" className="user-page-icon" />
                                <span className="author" style={this.customStyle}>@{this.props.match.params.username.substring(1)}</span>
                            </div>
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
        tweets: state.tweets
    };
};
export default connect(mapStateToProps)(User);
