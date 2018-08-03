import { Icon } from 'antd';
import * as React from 'react';


class Tweet extends React.Component<{}, {author: string, date: string, text: string}>{
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
            <Icon type="like"/>
            <Icon type="retweet"/>
                        
        </div>
        );
    }
}

export default Tweet