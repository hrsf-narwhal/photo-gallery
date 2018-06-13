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
Button.displayName = 'ZoomButton';

const Svg = styled.svg`
	fill: currentColor;
	height: 100%;
	width: 100%;
`;
Svg.displayName = 'Svg';

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
Overlay.displayName = 'Overlay';

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
Img.displayName = 'Img';

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
					<svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
					<symbol id="search-plus" viewBox="0 0 512 512">
							<title id="search-plus-title">Search Plus</title>
							<path d="M312 196v24c0 6.6-5.4 12-12 12h-68v68c0 6.6-5.4 12-12 12h-24c-6.6 0-12-5.4-12-12v-68h-68c-6.6 0-12-5.4-12-12v-24c0-6.6 5.4-12 12-12h68v-68c0-6.6 5.4-12 12-12h24c6.6 0 12 5.4 12 12v68h68c6.6 0 12 5.4 12 12zm196.5 289.9l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L347.5 387.1c-2.3-2.3-3.5-5.3-3.5-8.5v-13.2c-36.5 31.5-84 50.6-136 50.6C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208c0 52-19.1 99.5-50.6 136h13.2c3.2 0 6.2 1.3 8.5 3.5l121.4 121.4c4.7 4.7 4.7 12.3 0 17zM368 208c0-88.4-71.6-160-160-160S48 119.6 48 208s71.6 160 160 160 160-71.6 160-160z"></path>
						</symbol>
					</svg>
				</div>
			);
		}
		return null;
	}
}

export default Zoom;