import tweetsConstant from '../constants/tweetsConst';

const initialState = {
  hasErrored: false,
  isLoading: false,
  tweets: [],
}
export default function tweets(state = initialState, action: any) {
  switch (action.type) {
    case tweetsConstant.TWEETS_HAS_ERRORED: {
      return { ...state, hasErrored: true };
      break;
    }
    case tweetsConstant.TWEETS_IS_LOADING: {
      return { ...state, isLoading: true };
      break;
    }
    case tweetsConstant.TWEETS_FETCH_DATA_SUCCESS: {
      return { ...state, tweets: action.tweets, isLoading: false };
    }
    case tweetsConstant.TWEETS_ADD: {
      return { ...state, tweets: [action.newTweet, ...state.tweets] };
    }
    case tweetsConstant.ADD_TWEET_SUCCESS: {
      return { ...state, tweets: [action.newTweet, ...state.tweets], isLoading: false, addTweetSuccess: true };
    }
    case tweetsConstant.SEARCH_USERS: {
      return { ...state, usersFound: [action.usersFound] }
    }
    case tweetsConstant.USERS_FETCH_DATA_SUCCESS: {
      return { ...state, usersFound: action.users, isLoading: false, searchSuccess: true }
    }
    case tweetsConstant.LIKE_TWEET: {
      return {
        ...state,
        tweets: state.tweets.map(tweet => {
          if (tweet.id === action.tweet.id) {
            return {
              ...tweet,
              countLikes: tweet.countLikes + 1
            }
          } else {
            return { ...tweet }
          }
        })
      }
    }
    case tweetsConstant.UNLIKE_TWEET: {
      return {
        ...state,
        tweets: state.tweets.map(tweet => {
          if (tweet.id === action.tweet.id) {
            return {
              ...tweet,
              countLikes: tweet.countLikes - 1
            }
          } else {
            return { ...tweet }
          }
        })
      }
    }
    default: {
      return state;
    }
  }
}