import Header from '../Header';
import * as React from 'react';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
(enzyme as any).configure({ adapter: new Adapter() });
describe('Header', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Header />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });    
});