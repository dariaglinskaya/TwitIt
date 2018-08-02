import * as React from 'react';
import Tweet from './Tweet';

function Feed(){
    return(
        <ul className="App-feed">
            <Tweet/>
            <Tweet/>
        </ul>
        );
}

export default Feed