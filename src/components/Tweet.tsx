import { Icon } from 'antd';
import * as React from 'react';


export default class Tweet extends React.Component<any, any>{
    public render() {
        return (
            <div className="tweet-item">
                <span className="author">@{this.props.author}</span>
                <time dateTime="2018-08-02" className="tweet-date">{this.props.date}</time>
                <hr />
                <div className="tweet-text">{this.props.text}</div>
                <a href=''><Icon type="like" /></a>
                <a href=''><Icon type="retweet" /></a>
            </div>
        );
    }
}
