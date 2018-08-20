import { Col, Icon } from 'antd';
import * as React from 'react';
import Footer from './Footer';
import Header from './Header';
import Tweet from './Tweet';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export interface IProps {
    authentication: any;
    tweets: any;
    match: any;
}

export class User extends React.Component<IProps, {}>{
    private customStyle = {
        display: 'inline',
    };
    public renderOwnTweets() {
        const res = this.props.tweets.filter((tweet) => {
            console.log(tweet.author.toLowerCase() + '---------' + this.props.match.params.username.substring(1));
            return this.props.match.params.username.substring(1) === tweet.author.toLowerCase();
        });
        console.log(res)
        if (res.length !== 0) {
            return res.map((tweet, index) => {
                return <Tweet key={index + 100}
                    {...tweet} />;
            });
        } else {
            console.log("no admin tweets")
            return false;
        }
    }
    public renderUserRetweets() {
        const subscrID = this.props.authentication.user.retweets;
        console.log(subscrID)
        const tweets = this.props.tweets;
        const res = [];
        subscrID.forEach((id) => {
            res.push(tweets.find((tweet) => tweet._id == id));
        });
        console.log(res)
        if (subscrID.length !== 0) {
            return res.map((tweet, index) => {
                return <Tweet key={index}
                    {...tweet} retweeted={true} />;
            });
        } else {
            console.log('no retweets')
            return false;
        }
    }
    public renderUserTweets() {
        const subscr = this.renderOwnTweets();
        if (this.props.match.params.username.substring(1) === this.props.authentication.user.name) {
            const retweets = this.renderUserRetweets();
            if (subscr && retweets) {
                return subscr.concat(retweets);
            } else if (subscr) { return subscr } else {
                if (retweets) { return retweets }
            }
        }
    }
    public render() {
        return (
            !this.props.authentication.loggedIn ? (<Redirect to="/" />) :
                <div className='App-body' >
                    <Header />
                    <div>
                        <Col span={17} push={7}>
                            <div className="App-feed">
                                {this.renderUserTweets()}
                            </div>
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
        tweets: state.tweets.tweets
    };
};

export default connect(mapStateToProps)(User);
