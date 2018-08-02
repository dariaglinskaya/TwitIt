import { Icon } from 'antd';
import * as React from 'react';


function Tweet(){
    return(
        <div className="tweet-item">
            <span className="author">Admin Admin</span>
            <hr/>
            <div className="tweet-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
            <Icon type="like"/>
            <Icon type="retweet"/>
            <time dateTime="2018-08-02" className="tweet-date">2018-08-02</time>            
        </div>
        );
}

export default Tweet