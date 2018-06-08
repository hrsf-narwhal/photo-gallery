const React = require('react');
const ReactDOM = require('react-dom');

import styled from 'styled-components';

const Button = styled.button`
	background-color: transparent;
	border: none;
	border-radius: 3px;
	color: #333333;
	cursor: pointer;
	line-height: 2rem;
	outline: none;
	margin: 6px;
	padding: 0 6px 0 24px;
	position: absolute; bottom: calc(-2rem - 6px); right: 0;

	& > span {
		box-sizing: border-box;
		display: inline-block;
		margin: 0;
		overflow: hidden;
		padding: 4px 4px 4px 6px;
		position: absolute; top: 0; left: 0;
		text-align: center;
		width: 22px; height: 2rem;
	}
`;

const Svg = styled.svg`
	fill: currentColor;
	height: 100%;
	width: 100%;
`;

const Overlay = styled.div`
	background-color: rgba(255,255,255,0.95);
	box-sizing: border-box;
	cursor: pointer;
	font-size: 0;
	opacity: 0;
	position: fixed;
	transition: 0.2s opacity ease-in-out;
	width: 0; height: 0;

	&.on {
		opacity: 1;
		top: 0; left: 0; bottom: 0; right: 0;
		width: auto; height: auto;
	}
`;

const Img = styled.img`
	border: 8px solid #ffffff;
	border-radius: 3px;
	box-shadow: 0 1px 4px rgba(0,0,0,0.5);
	box-sizing: border-box;
	height: auto;
	margin: 0 auto;
	max-width: calc(100% - 24px);
	position: absolute; top: 50%; left: 50%;
	transform: translate(-50%, -50%);

	&[data-src] {
		opacity: 0;
		visibility: hidden;
	}
`;

class Zoom extends React.Component {
	constructor(props) {
		super(props);

		this.handleImageLoad = this.handleImageLoad.bind(this);
	}

	handleButtonClick(event) {
		event.preventDefault();

		const overlay = document.getElementById('overlay');
		overlay.classList.toggle('on');

		const img = overlay.querySelector('img');
		if ( img.getAttribute('data-src') ) {
			img.setAttribute('src', img.getAttribute('data-src'));
		}
	}

	handleImageLoad(event) {
		event.target.removeAttribute('data-src');
	}

	render() {
		if ( this.props.images.length > 0 ) {
			return (
				<div>
					<Button onClick={(e) => this.handleButtonClick(e)}><span><Svg><use xlinkHref="#search-plus"></use></Svg></span> Zoom</Button>
					<Overlay onClick={(e) => this.handleButtonClick(e)} id="overlay">
						<Img key={this.props.images[ this.props.current ].image_url} data-src={this.props.images[ this.props.current ].image_url} onLoad={(e) => this.handleImageLoad(e)} />
					</Overlay>
				</div>
			);
		}
		return null;
	}
}

export default Zoom;