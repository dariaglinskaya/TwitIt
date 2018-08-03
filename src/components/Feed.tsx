import { Input } from 'antd';
import * as React from 'react';
import Tweet from './Tweet';

const Search = Input.Search;

function Feed(){
    return(
        <ul className="App-feed">
            <Search placeholder="search user by login" enterButton="Search" className="search-input"/>
            <Tweet/>
            <Tweet/>
        </ul>
        );
}

export default Feed