import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Carousel from './Carousel.jsx';

configure({
	adapter: new Adapter()
});

describe('Carousel component', () => {

	it('Carousel renders with ID #carousel', () => {
		const component = shallow(<Carousel images={[]} />);
		expect( component.is('#carousel') ).toBe(true);
	})

});
