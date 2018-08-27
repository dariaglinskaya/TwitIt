import { connect } from 'react-redux';
import { Spin } from 'antd';
import * as React from 'react';

import Tweet from './Tweet';

export interface IProps {
    authentication: any;
    tweets: any;
    match: any;
    renderUserTweets: any;
    name: string;
    renderSuccess: boolean;
}

export class UserFeed extends React.Component<IProps, {}>{
    constructor(props) {
        super(props);
    }
    public renderTweets() {
        const tweets = this.props.tweets.usersTweets;
        tweets.sort(function (a, b) {
            return +new Date(b.date) - +new Date(a.date);
        });
        console.log(tweets);
        return tweets.map((tweet, index) => {
            console.log(tweet);
            return <Tweet key={index}
                {...tweet}
            />;
        });
    }
    public showSpin() {
        console.log('show spinner')
        return <Spin />
    }
    public renderEmpty() {
        return <div>No tweets added yet.</div>;
    }
    public render() {
        if (this.props.tweets.isLoading === true) {
            return <div className="App-feed">
                {console.log('spin')}
                <Spin />
            </div>;
        } else {
            return (
                <div>
                    <div className="App-feed">
                        <div>
                            {console.log(this.props.tweets.renderSuccess)}
                            {this.props.tweets.renderSuccess ? this.renderTweets() : this.showSpin()}
                        </div>
                    </div>
                </div>
            );
        }

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
export default connect(mapStateToProps)(UserFeed);