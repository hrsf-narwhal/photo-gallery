import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Zoom from './Zoom.jsx';

configure({
	adapter: new Adapter()
});

describe('Zoom component', () => {

	const component = shallow(<Zoom images={[{image_url: 'http://hrsf-itsy-photos.s3-website-us-west-1.amazonaws.com/images/1080/1080-04.jpg'}]} current={0} />);

	test('Zoom matches snapshot', () => {
		expect(component).toMatchSnapshot();
	})

});