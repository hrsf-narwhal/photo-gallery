import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Thumbnails from './Thumbnails.jsx';

configure({
	adapter: new Adapter()
});

describe('Thumbnails component', () => {

	const component = shallow(<Thumbnails images={[{image_url: 'http://hrsf-itsy-photos.s3-website-us-west-1.amazonaws.com/images/1080/1080-04.jpg'}]} current={0} thumbnailsPos={0} />);

	test('Thumbnail carousel matches snapshot', () => {
		expect(component).toMatchSnapshot();
	})

});
