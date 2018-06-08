const React = require('react');
const ReactDOM = require('react-dom');

import styled from 'styled-components';

import Arrow from './Arrow.jsx';
import Slide from './Slide.jsx';
import Thumbnails from './Thumbnails.jsx';
import Zoom from './Zoom.jsx';

const Container = styled.div`
  background-color: #f5f5f5;
  max-width: 100%;
  position: relative;
  width: 570px;

  &::after {
    content: '';
    display: block;
    padding-top: 100%;
    width: 100%;
  }
`;

const Carousel = (props) => {
  const slides = props.images.map( image => {
    return (
      <Slide image={image} />
    );
  });

  return (
    <Container id="carousel">
      <Slide images={props.images} current={props.current} next={props.next}/>
      <Arrow className="arrow-previous" action={(e) => props.previous(e)} glyph="-" />
      <Arrow className="arrow-next" action={(e) => props.next(e)} glyph="+" />
      <Thumbnails images={props.images} current={props.current} selectThumbnail={props.thumbnails} />
      <Zoom images={props.images} current={props.current} />
    </Container>
  );
}

export default Carousel;
