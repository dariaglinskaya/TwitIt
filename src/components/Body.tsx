import { Col } from 'antd';
import * as React from 'react';
import AddForm from '../containers/UserPage';
import Feed from './Feed';
import Footer from './Footer';
import Header from './Header';

interface IStateProps {
  authenticated: boolean;
}

interface State { newTweetContent: string, }

//export interface IAppProps extends IStateProps,State{}

const tweets = [{
  author: 'admin',
  date: "01.01.2018",
  text: "my first tweet"
},
{
  author: 'batman',
  date: "02.01.2018",
  text: "my second tweet"
}
];

export default class Body extends React.Component<IStateProps, State>{
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <body className='App-body' >
        <Header />
        <Col span={17} push={7}>
          <Feed tweets={tweets} />
        </Col>
        <Col span={7} pull={17}>
          <AddForm />
        </Col>
        <Footer />
      </body>
    );
  }

}
