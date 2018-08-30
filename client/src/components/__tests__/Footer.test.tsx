import Footer from '../Footer';
import {} from 'enzyme';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
(enzyme as any).configure({ adapter: new Adapter() });
describe('Footer', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Footer />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    // On the first run of this test, Jest will generate a snapshot file automatically.
  });
});