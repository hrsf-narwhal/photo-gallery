import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Arrow from './Arrow.jsx';

configure({
	adapter: new Adapter()
});

describe('Arrow component', () => {

	test('Previous arrow matches snapshot', () => {
		const component = shallow(<Arrow className="arrow-previous" glyph="‹" />);
		expect(component).toMatchSnapshot();
	})

	test('Next arrow matches snapshot', () => {
		const component = shallow(<Arrow className="arrow-next" glyph="›" />);
		expect(component).toMatchSnapshot();
	})

});