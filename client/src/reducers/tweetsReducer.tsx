import tweetsConstant from '../constants/tweetsConst';
import userConstant from '../constants/userConst';
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
      return { ...state, tweets: action.tweets, isLoading: false, userTweets: [] };
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
      return { ...state, usersFound: action.users, isLoading: false, searchSuccess: true, renderSuccess: false }
    }
    case tweetsConstant.RENDER_TWEET_SUCCESS: {
      return { ...state, usersTweets: action.userTweets, isLoading: false, renderSuccess: true }
    }
    case tweetsConstant.LIKE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        tweets: state.tweets.map(tweet => {
          if (tweet._id === action.tweet._id) {
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
    case tweetsConstant.UNLIKE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        tweets: state.tweets.map(tweet => {
          if (tweet._id === action.tweet._id) {
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
    case userConstant.USER_RETWEETED: {
      return {
        ...state,
        isLoading: false,
        tweets: state.tweets.map(tweet => {
          if (tweet._id === action._id) {
            return {
              ...tweet,
              countRetweets: tweet.countRetweets + 1
            }
          } else {
            return { ...tweet }
          }
        })
      }
    }
    case userConstant.USER_UNRETWEETED: {
      return {
        ...state,
        isLoading: false,
        tweets: state.tweets.map(tweet => {
          if (tweet._id === action._id) {
            return {
              ...tweet,
              countRetweets: tweet.countRetweets - 1
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