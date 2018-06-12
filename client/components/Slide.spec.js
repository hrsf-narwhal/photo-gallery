import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Slide from './Slide.jsx';

configure({
	adapter: new Adapter()
});

describe('Slide component', () => {

	beforeEach( () => {
		const carousel = document.createElement('div');
		carousel.setAttribute('id', 'carousel');
		document.body.appendChild(carousel);
	})

	it('Console.log the component', () => {
		const component = shallow(<Slide images={[{image_url: 'http://hrsf-itsy-photos.s3-website-us-west-1.amazonaws.com/images/1080/1080-04.jpg'}]} current={0} next={1}/>);

		console.log(component.debug());
	})

	test('Slide matches snapshot', () => {
		const component = shallow(<Slide images={[{image_url: 'http://hrsf-itsy-photos.s3-website-us-west-1.amazonaws.com/images/1080/1080-04.jpg'}]} current={0} next={1}/>);
		expect(component).toMatchSnapshot();
	})

});
