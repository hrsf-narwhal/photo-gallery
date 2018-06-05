const React = require('react');
const ReactDOM = require('react-dom');

import styled from 'styled-components';

import Arrow from './Arrow.jsx';
import Slide from './Slide.jsx';

const Container = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: top;
`;

const Carousel = (props) => {
  const slides = props.images.map( image => {
    return (
      <Slide image={image} />
    );
  });

  return (
    <Container id="carousel">
      <Slide images={props.images} current={props.current} />
      <Arrow className="arrow-previous" action={(e) => props.previous(e)} glyph="P" />
      <Arrow className="arrow-next" action={(e) => props.next(e)} glyph="N" />
    </Container>
  );
}

export default Carousel;
