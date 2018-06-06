const React = require('react');
const ReactDOM = require('react-dom');

import styled from 'styled-components';

const SlideDiv = styled.div`
	align-items: center;
	cursor: e-resize;
	display: flex;
	font-size: 0;
	height: 100%;
	position: absolute;
	width: 100%;

	&.square img.square,
	&.square img.landscape {
		height: auto;
		max-width: 100%;
	}
	&.square img.portrait {
		max-height: 100%;
		width: auto;
	}
`;

const Img = styled.img`
	display: block;
	margin: 0 auto;
	opacity: 1;
	transition: 0.4s opacity ease-in-out;
	visibility: visible;

	&[data-src], &.delay {
		opacity: 0;
		visibility: hidden;
	}
`;

class Slide extends React.Component {
	constructor(props) {
		super(props);

	}

	getOrientation(width, height) {
		if ( width === height ) {
			return 'square';
		} else 
		if ( width > height ) {
			return 'landscape';
		} else {
			return 'portrait';
		}
	}

	componentDidMount() {
		const slide = document.getElementById('carousel');
		this.orientation = this.getOrientation( carousel.offsetWidth, carousel.offsetHeight );
		console.log(this.orientation);
	}

	componentDidUpdate() {
		const img = document.getElementById('slide').querySelector('img');
		img.classList.add('delay');
		const loadImage = (img) => {
			img.setAttribute('src', img.getAttribute('data-src'));
			img.onload = () => {
				img.classList.add( this.getOrientation( img.naturalWidth, img.naturalHeight ) );
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
				<SlideDiv id="slide" className={this.orientation} onClick={(e) => this.props.next(e)}>
					<Img key={this.props.images[ this.props.current ].image_url} data-src={this.props.images[ this.props.current ].image_url} />
				</SlideDiv>
			);
		}
		return null;
	}
}

export default Slide;