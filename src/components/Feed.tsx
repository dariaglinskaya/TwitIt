import {connect} from 'react-redux';
import { Input } from 'antd';
//import { isEmpty } from 'lodash';
// import { Spin } from 'antd';
import * as React from 'react';

import Tweet from './Tweet';

const Search = Input.Search;

export interface IProps {    
}

export interface IState {
    tweets: any;
}

export class Feed extends React.Component<IProps, IState>{
    constructor(props) {
        super(props);
        this.state = {
            tweets: [{
                author: 'admin',
                date: "01.01.2018",
                text: "my first tweet",
                id: 1
            },
            {
                author: 'batman',
                date: "02.01.2018",
                text: "my second tweet",
                id: 2
            },
            {
                author: 'user1',
                date: "03.01.2017",
                text: "my third tweet",
                id: 3
            }
            ]
        }
    }

    public renderTweets() {
        const { tweets } = this.state;
        return tweets.map((tweet, index) => {
            return (
                <Tweet
                    key={index}
                    {...tweet}
                />
            );
        })
    }

    public renderEmpty() {
        return <div>No tweets added yet.</div>;
    }
    public render() {
        console.log(this.props);
        return (
            <div className="App-feed">
                <Search placeholder="search user by login" enterButton="Search" className="search-input" />
                {this.renderTweets()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      tweets: state.tweets.tweets,
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      addTweet: () =>
        dispatch({
          type: 'ADD_TWEET'
        })
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Feed);