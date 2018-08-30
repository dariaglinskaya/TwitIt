import { Col, Icon, Button } from 'antd';
import * as React from 'react';
import Footer from './Footer';
import Header from '../containers/Header';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import UserFeed from '../containers/UserFeed';
import userActions from '../actions/userActions';
import { bindActionCreators } from 'redux';

export interface IProps {
    authentication: any;
    tweets: any;
    match: any;
    renderUserTweets: any;
    subscribe: any;
    unsubscribe: any;
}

export interface IState {
    subscribed: boolean;
}

export class User extends React.Component<IProps, IState>{
    constructor(props) {
        super(props);
        this.state = {
            subscribed: false,
        };
    }
    private customStyle = {
        display: 'inline',
    };
    componentDidMount() {
        if (this.props.authentication.user.subscriptions !== undefined) {
            this.props.authentication.user.subscriptions.forEach((item) => {
                if (item === this.props.match.params.username.substring(1)) {
                    this.setState(() => ({ subscribed: true }));
                } else {
                    this.setState(() => ({ subscribed: false }));
                }
            });
        }
    }
    public subscribe(event) {
        event.preventDefault();
        this.props.subscribe(this.props.match.params.username.substring(1), this.props.authentication.user.username);
        this.setState(() => ({ subscribed: true }));
    }
    public unsubscribe(event) {
        event.preventDefault();
        this.props.unsubscribe(this.props.match.params.username.substring(1), this.props.authentication.user.username);
        this.setState(() => ({ subscribed: false }));
    }
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
                                {this.state.subscribed ?
                                    <Button type="primary" onClick={e => this.unsubscribe(e)} >Unsubscribe</Button> :
                                    <Button type="default" onClick={e => this.subscribe(e)}>Subscribe</Button>}
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
const mapDispatchToProps = dispatch => {
    const subscribe = (name, admin) => userActions.subscribe(name, admin);
    const unsubscribe = (name, admin) => userActions.unsubscribe(name, admin);
    return {
        ...bindActionCreators({ subscribe, unsubscribe }, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(User);
