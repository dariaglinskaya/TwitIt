import { Icon } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import tweetsActions from '../actions/tweetsActions';
import userActions from '../actions/userActions';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';

export interface IState {
    liked: boolean;
    retweeted: boolean;
}
export interface IProps {
    authentication: any;
}
export class Tweet extends React.Component<any, IState>{
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            retweeted: false
        };
    }
    public handleClickLike(event) {
        event.preventDefault();
        if (this.state.liked) {
            this.props.unLikeTweet(this.props);
            this.setState(() => ({ liked: false }));
        } else {
            console.log(this.props)
            this.props.likeTweet(this.props);
            this.setState(() => ({ liked: true }));
        }
    }
    public handleClickRetweet(event) {
        event.preventDefault();
        if (this.state.retweeted) {
            this.props.unRetweet(this.props._id, this.props.authentication.user.username);
            this.setState(() => ({ retweeted: false }));
        } else {
            this.props.retweet(this.props._id, this.props.authentication.user.username);
            this.setState(() => ({ retweeted: true }));
        }

    }
    public userTweet(name, admin) {
        this.props.renderUserTweets(name, admin);
    }
    public render() {
        return (
            <div className="tweet-item">
                <Link to={"/user/:" + this.props.author.toLowerCase()} className="author" >
                    <a onClick={() => this.userTweet(this.props.author.toLowerCase(), this.props.authentication.user)}>@{this.props.author.toLowerCase()}</a>
                </Link>
                <time className="tweet-date"><Moment format='YYYY-MM-DD HH:mm'>{this.props.date}</Moment></time>
                <hr />
                <div className="tweet-text">{this.props.text}</div>
                <a href='' onClick={this.handleClickLike.bind(this)}>
                    <Icon type="heart-o" style={this.state.liked ? { color: "#1890ff" } : { color: "grey" }} />
                </a>
                <span>{this.props.countLikes ? this.props.countLikes : ""}</span>
                <a href='' onClick={this.handleClickRetweet.bind(this)}>
                    <Icon type="retweet" style={(this.state.retweeted || this.props.retweeted) ? { color: "#1890ff" } : { color: "grey" }} />
                </a>
                <span>{this.props.countRetweets ? this.props.countRetweets : ""}</span>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        tweets: state.tweets,
        hasErrored: state.tweetsHasErrored,
        isLoading: state.tweetsIsLoading,
        authentication: state.authentication
    };
};
const mapDispatchToProps = dispatch => {
    const likeTweet = (tweet) => tweetsActions.likeTweet(tweet);
    const unLikeTweet = (tweet) => tweetsActions.unlikeTweet(tweet);
    const retweet = (id, admin) => userActions.retweet(id, admin);
    const unRetweet = (id, admin) => userActions.unretweet(id, admin);
    const renderUserTweets = (user, admin) => tweetsActions.renderUserTweets(user, admin);
    return {
        ...bindActionCreators({ likeTweet, unLikeTweet, retweet, unRetweet, renderUserTweets }, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Tweet);
