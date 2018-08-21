import { connect } from 'react-redux';
import { Spin } from 'antd';
import * as React from 'react';
import tweetsActions from '../actions/tweetsActions';

import Tweet from './Tweet';

export interface IProps {
    hasErrored: boolean;
    isLoading: boolean;
    fetchData: any;
    tweets: any;
    subscriptions: any;
    authentication: any;
}

export class Feed extends React.Component<IProps, {}>{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchData('http://localhost:5000/feed');
    }

    public renderTweets() {
        const tweets = this.props.tweets.tweets;
        const subscr = this.props.subscriptions;
        const res = [];

        subscr.forEach((subscr) => {
            tweets.forEach(tweet => {
                if (tweet.author.toLowerCase() === subscr) {
                    res.push(tweet);
                }
            });
        });
        return res.map((tweet, index) => {
            return <Tweet key={index}
                {...tweet}
            />;
        });

    }

    public renderEmpty() {
        return <div>No tweets added yet.</div>;
    }
    public render() {
        if (!this.props.subscriptions) {
            return <p>No items to show.</p>;
        }
        if (this.props.tweets.isLoading === true) {
            return <div className="App-feed">
                <Spin />
            </div>;
        }
        return (
            <div>
                <div className="App-feed">
                    <div>
                        {this.renderTweets()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tweets: state.tweets,
        hasErrored: state.tweetsHasErrored,
        isLoading: state.tweetsIsLoading,
        subscriptions: state.authentication.user.subscriptions,
        authentication: state.authentication
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: (url) => dispatch(tweetsActions.tweetsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);