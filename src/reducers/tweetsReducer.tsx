import * as _ from 'lodash';
import {tweetsConstant} from '../constants/tweetsConst';

export default function reducer(
  state = {
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
  },
  action: any
) {
  switch (action.type) {
    case tweetsConstant.FETCH_TWEETS_STARTED: {
      return { ...state, fetchingTweets: true };
      break;
    }
    case tweetsConstant.FETCH_TWEETS_REJECTED: {
      return { ...state, fetchingTweets: false, error: action.payload };
      break;
    }
    case tweetsConstant.FETCH_TWEETS_FULFILLED: {
      const sortedTweets = _.orderBy(action.payload, ["time"], ["desc"]);

      return {
        ...state,
        fetchedTweets: true,
        fetchingTweets: false,
        tweets: sortedTweets,
        error: null
      };
      break;
    }
    case tweetsConstant.FETCH_USER_TWEETS_STARTED: {
      return { ...state, fetchingUserTweets: true };
      break;
    }
    case tweetsConstant.FETCH_USER_TWEETS_REJECTED: {
      return { ...state, fetchingUserTweets: false, error: action.payload };
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
      return { ...state, tweetPosted: "ongoing" };
      break;
    }
    case tweetsConstant.POST_TWEET_SUCCESS: {
      return { ...state, tweetPosted: "success" };
      break;
    }
    case tweetsConstant.POST_TWEET_FAILED: {
      return { ...state, tweetPosted: "failed" };
      break;
    }

    default: {
      return state;
    }
  }
}