const React = require('react');
const ReactDOM = require('react-dom');

import styled from 'styled-components';

const SlideContainer = styled.div`
	font-size: 0;
`;

const Img = styled.img`
	display: block;
`;

const Slide = (props) => {
	if ( props.images.length > 0 ) {
		return (
			<div id="slide">
				<Img src={props.images[ props.current ].image_url} />
			</div>
		);
	}
	return null;
}

export default Slide;