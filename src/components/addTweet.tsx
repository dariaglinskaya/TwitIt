import * as React from 'react';
import { connect } from 'react-redux';

import AddForm from '../containers/UserPage';

const AddTweet = (props: any) => (
    <div>
        <h3>Add Tweet</h3>
        <AddForm /*onSubmitTweet= {
            (tweet) => {
                props.dispatch(addTweet(tweet));
            }}*/
        
        />
    </div>
);

export default connect()(AddTweet);