import { Button } from 'antd';
import { connect } from 'react-redux';
import * as React from 'react';
import userActions from '../actions/userActions';
import tweetsActions from '../actions/tweetsActions';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

export interface IState {
    subscribed: boolean;
}
export interface IProps {
    subscribe: any;
    unsubscribe: any;
    username: string;
    authentication: any;
    subscr: boolean;
    renderUserTweets: any;
}
export class SearchItem extends React.Component<IProps, IState>{
    constructor(props) {
        super(props);
        this.state = {
            subscribed: false,
        };
    }
    public subscribe(event) {
        event.preventDefault();
        this.props.subscribe(this.props.username.toLowerCase(), this.props.authentication.user.username);
        this.setState(() => ({ subscribed: true }));
    }
    public unsubscribe(event) {
        event.preventDefault();
        this.props.unsubscribe(this.props.username.toLowerCase(), this.props.authentication.user.username);
        this.setState(() => ({ subscribed: false }));
    }
    componentDidMount() {
        if (this.props.authentication.user.subscriptions !== undefined) {
            this.props.authentication.user.subscriptions.forEach((item) => {
                console.log(this.props.username + '--' + item)
                if (item === this.props.username) {
                    console.log('true')
                    this.setState(() => ({ subscribed: true }));
                } else {
                    this.setState(() => ({ subscribed: false }));
                }
            })
        }
    }
    public userTweet(name, admin) {
        this.props.renderUserTweets(name, admin);
    }
    public render() {
        return (
            <div className="search-item">
                {console.log(this.state)}
                <Link to={'/user/:' + this.props.username.toLowerCase()} className="author">
                    <a onClick={() => this.userTweet(this.props.username.toLowerCase(), this.props.authentication.user)}> @{this.props.username.toLowerCase()}</a>
                </Link>
                {this.state.subscribed ?
                    <Button type="primary" onClick={e => this.unsubscribe(e)} >Unsubscribe</Button> :
                    <Button type="default" onClick={e => this.subscribe(e)}>Subscribe</Button>}
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
    const renderUserTweets = (user, admin) => tweetsActions.renderUserTweets(user, admin);
    const subscribe = (name, admin) => userActions.subscribe(name, admin);
    const unsubscribe = (name, admin) => userActions.unsubscribe(name, admin);
    return {
        ...bindActionCreators({ subscribe, unsubscribe, renderUserTweets }, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchItem);