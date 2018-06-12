const React = require('react');
const ReactDOM = require('react-dom');

import styled from 'styled-components';

const ThumbnailsContainer = styled.div`
	position: absolute; bottom: -54px; left: 0;
	width: 100%;
`;
ThumbnailsContainer.displayName = "Thumbnails";

const ThumbnailsDiv = styled.div`
	height: 50px;
	margin: 0 auto;
	max-width: calc(100% - 162px);
	overflow: hidden;
	position: relative;
`;

const ThumbnailsUl = styled.ul`
	font-size: 0;
	margin: 0 auto;
	overflow: hidden;
	padding: 0;
	position: absolute; top: 0; left: 0;
	text-align: center;
	transition: 0.2s left ease-in-out;
	white-space: nowrap;
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
Thumbnail.displayName = 'Thumbnail';

const Img = styled.img`
	height: auto;
	max-width: 100%;
	opacity: 0.5;
	transition: 0.2s opacity ease-in-out;

	&.current, &:hover {
		opacity: 1;
	}
`;
Img.displayName = 'Img';

const Thumbnails = (props) => {
		const thumbnails = props.images.map( (image, i) => {
			const url = image.image_url.match(/(http:\/\/[^\/]*)(.*)/);
			const sizes = ['/50x50xWidthHeight', '/100x100xWidthHeight', '/150x150xWidthHeight'];
			const src = url[1] + sizes[0] + url[2];
			const srcset = sizes.map( (size, i) => url[1] + size + url[2] + ' ' + (i+1) + 'x').join(', ');
			return (
				<Thumbnail key={i} onClick={(e) => props.selectThumbnail(e)}>
					<Img src={src} srcSet={srcset} data-idx={i} className={props.current === i ? 'current' : null} />
				</Thumbnail>
			);
		});

		if ( props.images.length > 0 ) {
			return (
				<ThumbnailsContainer>
				<ThumbnailsDiv id="thumbnailsDiv" style={{ width: (props.images.length * 54) + 'px' }}>
					<ThumbnailsUl id="thumbnailsUl" style={{ left: props.thumbnailsPos }}>
						{thumbnails}
					</ThumbnailsUl>
				</ThumbnailsDiv>
				</ThumbnailsContainer>
			);
		}
		return null;

}

export default Thumbnails;