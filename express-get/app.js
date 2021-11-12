const express = require('express')
const app = express()
const hbs = require('hbs')


const port = 3000

const movies = require('./movies.json');

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials')

app.get('/', (req, res) => {
	res.render('movies', { movieList: movies, doctitle: 'Home Page', heading: 'This is all the movies 🦄' })
})

app.get('/moviesearch', (req, res) => {
	const searchTerm = req.query.q
	const filteredMovies = movies.filter(movie => {
		return movie.title.toLowerCase().includes(searchTerm.toLowerCase())
	})
	// res.send(filteredMovies)
	// res.send(req.query.q)
	res.render('movies', { movieList: filteredMovies, doctitle: 'Filtered results', heading: 'This is the result of your search 🔎' })
})

app.get('/movies/:title', (req, res) => {
	// const title = req.params.title
	// console.log(title)
	const clickedMovie = movies.find((function (movie) {
		return movie.title === req.params.title
	}))
	console.log(clickedMovie)
	res.render('movieDetails', { movie: clickedMovie, doctitle: 'Detail Page' })
})

// app.get('/godfather', (req, res) => {
// 	const godfather = movies.find((function (movie) {
// 		return movie.title === 'The Godfather'
// 	}))
// 	console.log(godfather)
// 	res.render('movieDetails', { movie: godfather, doctitle: 'Detail Page' })
// })
// route parameter
// app.get('/beers/:id', (req, res) => {
// 	const routeParam = req.params
// 	// console.log(routeParam)
// 	res.send(routeParam)
// })

// // query string
// app.get('/movies', (req, res) => {
// 	// access the query string
// 	res.send(req.query.title)
// })


app.listen(port, () => {
	console.log('listening on port 3000')
})