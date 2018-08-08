import * as _ from 'lodash';
import {tweetsConstant} from '../constants/tweetsConst';

const initialState = {
  error: null,
    fetchedTweetReplies: false,
    fetchedTweets: false,
    fetchedUserTweets: false,
    fetchingTweetReplies: false, 
    fetchingTweets: false,
    fetchingUserTweets: false,
    newTweetModalOpen: false,
    tweetPosted: "uninitiated",
    tweetReplies: [],
    tweets: [],
    userTweets: [],
}

export default function reducer( state = initialState, action: any ) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case tweetsConstant.FETCH_TWEETS_STARTED: {
      return { ...newState, fetchingTweets: true };
      break;
    }
    case tweetsConstant.FETCH_TWEETS_REJECTED: {
      return { ...newState, fetchingTweets: false, error: action.payload };
      break;
    }
    case tweetsConstant.FETCH_TWEETS_FULFILLED: {
      const sortedTweets = _.orderBy(action.payload, ["time"], ["desc"]);

      return {
        ...newState,
        fetchedTweets: true,
        fetchingTweets: false,
        tweets: sortedTweets,
        error: null
      };
      break;
    }
    case tweetsConstant.FETCH_USER_TWEETS_STARTED: {
      return { ...newState, fetchingUserTweets: true };
      break;
    }
    case tweetsConstant.FETCH_USER_TWEETS_REJECTED: {
      return { ...newState, fetchingUserTweets: false, error: action.payload };
      break;
    }
    case tweetsConstant.FETCH_USER_TWEETS_FULFILLED: {
      return {
        ...state,
        fetchedUserTweets: true,
        fetchingUserTweets: false,
        userTweets: action.payload,
        error: null
      };
      break;
    }
    case tweetsConstant.POST_TWEET_STARTED: {
      return { ...newState, tweetPosted: "ongoing" };
      break;
    }
    case tweetsConstant.POST_TWEET_SUCCESS: {
      return { ...newState, tweetPosted: "success" };
      break;
    }
    case tweetsConstant.POST_TWEET_FAILED: {
      return { ...newState, tweetPosted: "failed" };
      break;
    }

    default: {
      return state;
    }
  }
}