import { Col } from 'antd';
import * as React from 'react';
import AddForm from './AddForm';
import Footer from './Footer';
import Header from './Header';
import SearchItem from './SearchItem';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';


export interface IState { }

export interface IProps {
    authentication: any,
    tweets: any
}

export class Search extends React.Component<IProps, IState>{
    public renderUsers() {
        return this.props.tweets.usersFound[0].map((item, index) => {
            return <SearchItem key={index} {...item} />
        })
    }
    public render() {
        return (
            !this.props.authentication.loggedIn ? (<Redirect to="/" />) :
                <div className='App-body' >
                    <Header />
                    <div>
                        <Col span={17} push={7}>
                            <ul className="search-list">
                                {this.renderUsers()}
                            </ul>
                        </Col>
                        <Col span={7} pull={17}>
                            <AddForm />
                        </Col>
                    </div>
                    <Footer />
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
export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps),
)(Search);
