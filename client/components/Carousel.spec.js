import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Carousel from './Carousel.jsx';

configure({
	adapter: new Adapter()
});

describe('Carousel component', () => {

	it('Carousel renders with ID #carousel', () => {
		const component = shallow(<Carousel images={[{image_url: 'http://hrsf-itsy-photos.s3-website-us-west-1.amazonaws.com/images/1080/1080-04.jpg'}]} />);
		expect( component.is('#carousel') ).toBe(true);
	})

	test('Carousel matches snapshot', () => {
		const component = shallow(<Carousel images={[{image_url: 'http://hrsf-itsy-photos.s3-website-us-west-1.amazonaws.com/images/1080/1080-04.jpg'}]} />);
		expect(component).toMatchSnapshot();
	})

});
