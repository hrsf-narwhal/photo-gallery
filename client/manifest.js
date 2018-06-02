// CSS
import './app.css';

// JS
import './app.js';

// HELPERS

document.getElementById('seed-database').addEventListener('click', (e) => {
	e.preventDefault();

	fetch('/seed', {
		headers: {
			'content-type': 'application/json'
		},
		method: 'GET'
	})
	.then( response => response.json() )
	.then( response => console.log(response) )
	.catch( err => console.log('ERROR', err) );

});