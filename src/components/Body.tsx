import { Col } from 'antd';
import { connect } from "react-redux";
// import { fetchTweets } from "../actions/app";
import * as React from 'react';
import AddForm from '../containers/UserPage';
import Feed from './Feed';
import Footer from './Footer';
import Header from './Header';

function reduxify(mapStateToProps, mapDispatchToProps?, mergeProps?, options?) {
    return target => (connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(target) as any);
}

@reduxify(store => {
    return {
        tweets: store.tweets.tweets,
        fetchingTweets: store.tweets.fetchingTweets,
        fetchedTweets: store.tweets.fetchedTweets,
        errorTweets: store.tweets.error,
        // user: store.login.user,
        tweetPosted: store.tweets.tweetPosted,
        newTweetModalOpen: store.tweets.newTweetModalOpen
    };
})

interface Props {
    dispatch: any,
    user: any,    
    scopes: any;
}

interface State {newTweetContent: string,}

export default class Body extends React.Component<Props,State>{
    constructor(props: any) {
        super(props);
        this.state = {
            newTweetContent: "",
        };
    }
    openModal() {
        this.props.dispatch({ type: "NEW_TWEET_MODAL_OPEN" });
      }
    
      closeModal() {
        this.props.dispatch({ type: "NEW_TWEET_MODAL_CLOSE" });
      }
    
      postTweet() {
        this.props.dispatch({
          type: "POST_TWEET",
          payload: {
            user: this.props.user,
            tweetContent: this.state.newTweetContent
          }
        });
      }
    
      componentWillMount() {
        this.props.dispatch({ type: "FETCH_TWEETS" });
      }
    
      _keyExtractor = (item, index) => item.id;
    
      _profileClick(user) {
        this.props.navigation.navigate("Profile", user);
      }
    
      _tweetDetails(tweet) {
        this.props.navigation.navigate("TweetDetails", tweet);
      }
    public render(){
        return(
        <body className = 'App-body' >
            <Header />
            <Col span={17} push={7}>
                <Feed />
            </Col>
            <Col span={7} pull={17}>
                <AddForm />
            </Col>
            <Footer />
        </body>
    );
    }
    
}
