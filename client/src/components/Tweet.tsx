import { Icon } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import tweetsActions from '../actions/tweetsActions';
import userActions from '../actions/userActions';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

export interface IState {
    liked: boolean;
    retweeted: boolean;
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
            this.props.likeTweet(this.props);
            this.setState(() => ({ liked: true }));
        }
    }
    public handleClickRetweet(event) {
        event.preventDefault();
        if (this.state.retweeted) {
            this.props.unRetweet(this.props.id);
            this.setState(() => ({ retweeted: false }));
        } else {
            this.props.retweet(this.props.id);
            this.setState(() => ({ retweeted: true }));
        }

    }
    public render() {
        return (
            <div className="tweet-item">
                <Link to={"/user/:" + this.props.author.toLowerCase()} className="author">@{this.props.author.toLowerCase()}</Link>
                <time className="tweet-date">{this.props.date}</time>
                <hr />
                <div className="tweet-text">{this.props.text}</div>
                <a href='' onClick={this.handleClickLike.bind(this)}>
                    <Icon type="heart-o" style={this.state.liked ? { color: "#1890ff" } : { color: "grey" }} />
                </a>
                <span>{this.props.countLikes ? this.props.countLikes : ""}</span>
                <a href='' onClick={this.handleClickRetweet.bind(this)}>
                    <Icon type="retweet" style={(this.state.retweeted || this.props.retweeted) ? { color: "#1890ff" } : { color: "grey" }} />
                </a>
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
    const unLikeTweet = (tweet) => tweetsActions.unLikeTweet(tweet);
    const retweet = (id) => userActions.retweet(id);
    const unRetweet = (id) => userActions.unretweet(id);
    return {
        ...bindActionCreators({ likeTweet, unLikeTweet, retweet, unRetweet }, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Tweet);
