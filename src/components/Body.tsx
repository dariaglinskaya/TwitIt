import { Col } from 'antd';
import * as React from 'react';
import Feed from './Feed';
import Footer from './Footer';
import Header from './Header';
import UserPage from './UserPage';

function Body(){
    return(
        <body className='App-body'>
            <Header/>
            <Col span={17} push={7}>
                <Feed/>
                </Col>
            <Col span={7} pull={17}>
                <UserPage/>
            </Col>
            <Footer/>
        </body>
    );
}
export default Body