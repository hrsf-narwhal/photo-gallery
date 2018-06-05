const React = require('react');
const ReactDOM = require('react-dom');

import styled from 'styled-components';

const SlideContainer = styled.div`
	align-items: center;
	display: flex;
	font-size: 0;
	height: 100%;
	position: absolute;
`;

const Img = styled.img`
	display: block;
	flex-grow: 0;
`;

const Slide = (props) => {
	if ( props.images.length > 0 ) {
		return (
			<SlideContainer id="slide" onClick={(e) => props.next(e)}>
				<Img src={props.images[ props.current ].image_url} />
			</SlideContainer>
		);
	}
	return null;
}

export default Slide;