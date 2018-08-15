import { Icon } from 'antd';
import * as React from 'react';
import store from '../store';
import { connect } from 'react-redux';
import tweetsActions from '../actions/tweetsActions';
import { Link } from 'react-router-dom';

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
        }
    }
    public handleClickLike(event) {
        event.preventDefault();
        store.dispatch(tweetsActions.likeTweet(this.props));
        this.setState(() => ({ liked: true }));
    }
    public handleClickRetweet(event) {
        event.preventDefault();
        store.dispatch(tweetsActions.likeTweet(this.props));
        this.setState(() => ({ liked: true }));
    }
    public render() {
        return (
            <div className="tweet-item">
                <Link to={"/user/:"+this.props.author.toLowerCase()} className="author">@{this.props.author.toLowerCase()}</Link>
                <time className="tweet-date">{this.props.date}</time>
                <hr />
                <div className="tweet-text">{this.props.text}</div>
                <a href='' onClick={this.handleClickLike.bind(this)}><Icon type={this.state.liked ? "heart" : "heart-o"} /></a><span>{this.props.countLikes ? this.props.countLikes : ""}</span>
                <a href='' onClick={this.handleClickRetweet.bind(this)}><Icon type="retweet" style={this.state.retweeted ? {fontSize: "30px"} : {}}/></a>
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
    }
}
export default connect(mapStateToProps)(Tweet);
