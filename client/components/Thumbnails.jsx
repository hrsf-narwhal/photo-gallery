const React = require('react');
const ReactDOM = require('react-dom');

import styled from 'styled-components';

const ThumbnailsUl = styled.ul`
	font-size: 0;
	margin: 0; 
	padding: 0;
	position: absolute; bottom: -54px; left: 0;
	text-align: center;
	width: 100%;
`;

const Thumbnail = styled.li`
	background-color: #f5f5f5;
	cursor: pointer;
	display: inline-block;
	list-style: none;
	margin: 0 2px;
	padding: 0;
	vertical-align: top;
	width: 50px; height: 50px;
`;

const Img = styled.img`
	height: auto;
	max-width: 100%;
`;

const Thumbnails = (props) => {

	const thumbnails = props.images.map( (image, i) => {
		const url = image.image_url.match(/(http:\/\/[^\/]*)(.*)/);
		const resize = '/100x100xWidthHeight';
		const imgSrc = url[1] + resize + url[2];
		return (
			<Thumbnail key={i} onClick={(e) => props.action(e)}><Img src={imgSrc} data-idx={i} /></Thumbnail>
		);
	});

	if ( props.images.length > 0 ) {
		return (
			<ThumbnailsUl>
				{thumbnails}
			</ThumbnailsUl>
		);
	}
	return null;
}

export default Thumbnails;