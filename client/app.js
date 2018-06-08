const React = require('react');
const ReactDOM = require('react-dom');

import styled from 'styled-components';
import Carousel from './components/Carousel.jsx';

const Img = styled.img`
  border: 2px solid red;
  display: inline-block;
  height: auto;
  max-width: 100%;
  vertical-align: top;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleThumbnailClick = this.handleThumbnailClick.bind(this);

    this.pid = window.location.pathname.match(/\/[\w]+\/([\d]+)/)[1];
    this.state = {
      images: [],
      current: 0,
      thumbnailsPos: 0
    }
  }

  fetchImages() {
    fetch('/images/' + this.pid, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then( response => response.json() )
    .then( response => {
      this.setState({
        images: response
      });
    })
    .catch( err => console.log(err) );
  } // fetchImages

  componentDidMount() {
    this.fetchImages();
  }

  calcThumbnailPosition(currentIndex) {
    const div = document.getElementById('thumbnailsDiv');
    const ul = document.getElementById('thumbnailsUl');
    const left = -(currentIndex * 54);
    const idealPosition = div.offsetWidth/2 - 54/2;
    const position = idealPosition + left;
    const positionLimit = -(ul.scrollWidth - div.offsetWidth);

    if ( position > 0 ) {
      return 0;
    }
    if ( position < positionLimit ) {
      return positionLimit + 'px';
    }
    return position + 'px';
  }

  handleLeftClick(event) {
    event.preventDefault();
    let current = this.state.current;
    let previous = current > 0 ? current - 1 : this.state.images.length - 1;
    this.setState({
      current: previous,
      thumbnailsPos: this.calcThumbnailPosition(previous)
    });
  }

  handleRightClick(event) {
    event.preventDefault();
    let current = this.state.current;
    let next = current < this.state.images.length - 1 ? current + 1 : 0;
    this.setState({
      current: next,
      thumbnailsPos: this.calcThumbnailPosition(next)
    });
  }

  handleThumbnailClick(event) {
    event.preventDefault();
    const idx = parseInt(event.target.getAttribute('data-idx'),10);
    if ( idx !== this.state.current ) {
      this.setState({
        current: idx,
        thumbnailsPos: this.calcThumbnailPosition(idx)
      });
    }
  }

  render() {
    return (
      <div>
        <Carousel 
          images={this.state.images} 
          current={this.state.current} 
          next={this.handleRightClick} 
          previous={this.handleLeftClick} 
          thumbnails={this.handleThumbnailClick} 
          thumbnailsPos={this.state.thumbnailsPos} 
        />
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
          <symbol id="angle-left" viewBox="0 0 192 512">
            <title id="angle-left-title">angle-left</title>
            <path d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z"></path>
          </symbol>
          <symbol id="angle-right" viewBox="0 0 192 512">
            <title id="angle-right-title">angle-right</title>
            <path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z"></path>
          </symbol>
          <symbol id="search-plus" viewBox="0 0 512 512">
            <title id="search-plus-title">Search Plus</title>
            <path d="M312 196v24c0 6.6-5.4 12-12 12h-68v68c0 6.6-5.4 12-12 12h-24c-6.6 0-12-5.4-12-12v-68h-68c-6.6 0-12-5.4-12-12v-24c0-6.6 5.4-12 12-12h68v-68c0-6.6 5.4-12 12-12h24c6.6 0 12 5.4 12 12v68h68c6.6 0 12 5.4 12 12zm196.5 289.9l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L347.5 387.1c-2.3-2.3-3.5-5.3-3.5-8.5v-13.2c-36.5 31.5-84 50.6-136 50.6C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208c0 52-19.1 99.5-50.6 136h13.2c3.2 0 6.2 1.3 8.5 3.5l121.4 121.4c4.7 4.7 4.7 12.3 0 17zM368 208c0-88.4-71.6-160-160-160S48 119.6 48 208s71.6 160 160 160 160-71.6 160-160z"></path>
          </symbol>
        </svg>
      </div>
    )
  } // render

} // App

ReactDOM.render(<App />, document.getElementById('app'));
