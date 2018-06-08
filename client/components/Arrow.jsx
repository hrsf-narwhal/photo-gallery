const React = require('react');
const ReactDOM = require('react-dom');

import styled from 'styled-components';

const Button = styled.button`
	background-color: rgba(255,255,255,0.15);
	border: none;
	border-radius: 3px;
	color: #ffffff;
	cursor: pointer;
	font-size: 2.5rem;
	font-weight: normal;
	line-height: 5rem;
	margin-top: -2.5rem;
	outline: none;
	padding: 0;
	position: absolute; top: 50%; left: 6px;
	text-align: center;
	text-shadow: 0px 1px 2px rgba(0,0,0,0.25);
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