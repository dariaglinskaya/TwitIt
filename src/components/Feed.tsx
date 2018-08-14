import { connect } from 'react-redux';
import './style.css';
import { Spin } from 'antd';
import * as React from 'react';
import tweetsFetchData from '../actions/tweetsActions';

import Tweet from './Tweet';

export interface IProps {
    hasErrored: boolean,
    isLoading: boolean,
    fetchData: any,
    tweets: any,
    subscriptions: any,
    authentication: any
}

export interface IState {
}

export class Feed extends React.Component<IProps, IState>{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchData('http://5b6b3e39ad81cd0014d153c6.mockapi.io/tweets');
    }

    public renderTweets() {
        const tweets = this.props.tweets.tweets;
        const subscr = this.props.subscriptions;
        const res = [];

        subscr.forEach((subscr) => {
            tweets.forEach(tweet => {
                if (tweet.author.toLowerCase() === subscr) {
                    res.push(tweet)
                }
            });
        });
        return res.map((tweet, index) => {
            return <Tweet key={index}
                {...tweet}
            />
        });

    }

    public renderEmpty() {
        return <div>No tweets added yet.</div>;
    }
    public render() {
        console.log(this.props);
        if (!this.props.subscriptions) {
            return <p>No items to show.</p>;
        }
        if (this.props.tweets.isLoading === true) {
            <div className="App-feed">
                return <Spin />
            </div>

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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: (url) => dispatch(tweetsFetchData(url))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);