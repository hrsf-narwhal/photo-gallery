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
      </div>
    )
  } // render

} // App

ReactDOM.render(<App />, document.getElementById('photo-gallery'));
