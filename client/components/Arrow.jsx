const React = require('react');
const ReactDOM = require('react-dom');

import styled from 'styled-components';

const Button = styled.button`
	background-color: rgba(255,255,255,0.15);
	border: none;
	border-radius: 3px;
	color: #ffffff;
	cursor: pointer;
	line-height: 5rem;
	margin-top: -2.5rem;
	outline: none;
	padding: 0;
	position: absolute; top: 50%; left: 6px;
	text-align: center;
	width: 3rem;

	&.arrow-next {
		left: auto; right: 6px;
	}
`;

const Arrow = ({className, action, glyph}) => {
	return (
		<Button className={className} onClick={action}>{glyph}</Button>
	);
}

export default Arrow;