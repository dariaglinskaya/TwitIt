import { Button } from 'antd';
import { connect } from 'react-redux';
import * as React from 'react';
import store from '../store';
import userActions from '../actions/userActions';

export class SearchItem extends React.Component<any, any>{
    public subscribe(event) {
        console.log(event.target)
        store.dispatch(userActions.subscribe(this.props.name.toLowerCase()));
    }
    public render() {
        return (
            <div className="search-item">
                <span className="author">@{this.props.name.toLowerCase()}</span>
                <Button type="primary" onClick={value => this.subscribe(this.props.name)}>Subscribe</Button>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        authentication: state.authentication,
        tweets: state.tweets
    }
}

export default connect(mapStateToProps)(SearchItem);