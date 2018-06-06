const React = require('react');
const ReactDOM = require('react-dom');

import styled from 'styled-components';

const SlideContainer = styled.div`
	align-items: center;
	display: flex;
	font-size: 0;
	height: 100%;
	position: absolute;
	width: 100%;
`;

const Img = styled.img`
	display: block;
	flex-grow: 0;
	height: auto;
	max-width: 100%;
	opacity: 1;
	transition: 0.4s opacity ease-in-out;
	visibility: visible;

	&[data-src], &.delay {
		opacity: 0;
		visibility: hidden;
	}
`;

class Slide extends React.Component {

	componentDidUpdate() {
		const img = document.getElementById('slide').querySelector('img');
		img.classList.add('delay');
		const loadImage = function(img) {
			img.setAttribute('src', img.getAttribute('data-src'));
			img.onload = () => {
				img.removeAttribute('data-src');
			}
			setTimeout(() => {
				img.classList.remove('delay');
			}, 250);
		};
		loadImage(img);
	}

	render() {
		if ( this.props.images.length > 0 ) {
			return (
				<SlideContainer id="slide" onClick={(e) => props.next(e)}>
					<Img data-src={this.props.images[ this.props.current ].image_url} />
				</SlideContainer>
			);
		}
		return null;
	}
}

export default Slide;