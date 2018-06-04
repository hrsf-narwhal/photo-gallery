const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: []
    }
  }

  fetchImages() {
    fetch('/images/1026', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then( response => response.json() )
    .then( response => {
      console.log(response)
      this.setState({
        images: response
      });
    })
    .catch( err => console.log(err) );
  } // fetchImages

  componentDidMount() {
    this.fetchImages();
  }

  render() {

    const images = this.state.images.map( image => {
      return (
        <img src={image.image_url} />
      );
    });

    return (
      <div>
        <h1>Hello, world!</h1>
        <p>{images}</p>
      </div>
    )
  } // render

} // App

ReactDOM.render(<App />, document.getElementById('app'));
