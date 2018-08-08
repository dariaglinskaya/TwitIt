import { Col } from 'antd';
import * as React from 'react';
import AddForm from './addForm';
import Footer from './Footer';
import Feed from './Feed';
import Header from './Header';

interface State { newTweetContent: string, }

//export interface IAppProps extends IStateProps,State{}

export interface IProps {
  tweets: {
      author?: string,
      date?: string,
      text?: string
  }[]
}

export default class Body extends React.Component<IProps, State>{
  constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <div className='App-body' >
        <Header />
        <Col span={17} push={7}>
          <Feed/>
        </Col>
        <Col span={7} pull={17}>
          <AddForm />
        </Col>
        <Footer />
      </div>
    );
  }

}
