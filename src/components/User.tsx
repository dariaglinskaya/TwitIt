import { Col, Icon } from 'antd';
import * as React from 'react';
import Footer from './Footer';
import Header from './Header';
import Tweet from './Tweet';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export interface IState { }

export interface IProps {
    authentication: any,
    tweets: any,
    match: any
}

export class User extends React.Component<IProps, IState>{
    public renderUserTweetsSubscr() {
        console.log()
        const res = this.props.tweets.filter((tweet) => {
            return this.props.match.params.username.substring(1) === tweet.author.toLowerCase()
        });
        return res.map((tweet, index) => {
            return <Tweet key={index+100}
                {...tweet} />
        })
    }
    public renderUserRetweets() {
        let subscrID = this.props.authentication.user.retweets;
        let tweets = this.props.tweets;
        let res = [];
        subscrID.forEach((id) => {
            res.push(tweets.find((tweet) => { return tweet.id === id }));
        });
        return res.map((tweet, index) => {
            return <Tweet key={index}
                {...tweet} retweeted={true}/>
        })
    }
    public renderUserTweets() {
        let subscr = this.renderUserTweetsSubscr();
        let retweets = this.renderUserRetweets();
        return subscr.concat(retweets);
    }
    private customStyle = {
        display: 'inline',
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
    }
}

export default connect(mapStateToProps)(User);