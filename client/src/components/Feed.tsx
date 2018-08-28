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
        this.props.fetchData(this.props.authentication.user);
    }

    public renderTweets() {
        const tweets = this.props.tweets.tweets;
        if (tweets.length) {
            tweets.sort(function (a, b) {
                return +new Date(b.date) - +new Date(a.date);
            });
            return tweets.map((tweet, index) => {
                return <Tweet key={index}
                    {...tweet}
                />;
            });
        } else {
            return <div>No tweets found</div>
        }
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
        fetchData: (user) => dispatch(tweetsActions.tweetsFetchData(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);