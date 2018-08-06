import { Icon } from 'antd';
import * as React from 'react';


export default class Tweet extends React.Component<{}, {author: string, date: string, text: string}>{
    constructor(props: string){
        super(props);
        this.state = {
            author: 'admin',
            date: "01.01.2018",
            text: "my first tweet"
        }
    }
    public render() {
        return (
        <div className="tweet-item">
            <span className="author">{this.state.author}</span>
            <time dateTime="2018-08-02" className="tweet-date">{this.state.date}</time>
            <hr/>
            <div className="tweet-text">{this.state.text}</div>
            <a href=''><Icon type="like"/></a>
            <a href=''><Icon type="retweet"/></a>                        
        </div>
        );
    }
}
