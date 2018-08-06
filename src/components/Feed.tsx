import { Input } from 'antd';
import * as React from 'react';
import Tweet from './Tweet';

const Search = Input.Search;

export default class Feed extends React.Component<{}, {}>{
    constructor(props: object){
        super(props);
    }
    public render(){
        return(
        <ul className="App-feed">
            <Search placeholder="search user by login" enterButton="Search" className="search-input"/>
            <Tweet />
            <Tweet/>
        </ul>
        );
    }
}
