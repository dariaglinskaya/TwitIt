import * as React from 'react';
import Feed from './Feed';
import Footer from './Footer';
import Header from './Header';

function Body(){
    return(
        <body className='App-body'>
            <Header/>
            <Feed/>
            <Footer/>
        </body>
    );
}
export default Body