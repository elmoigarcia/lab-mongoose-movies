const Movie = require('../models/movie.model');
const Celebrity = require('../models/celebrity.model');

module.exports.list = (req, res, next) => {
  Movie.find()
    .populate('celebrity')
    .then(movies => res.render('movies/list', { movies }))
    .catch(err => next(err))
}

module.exports.create = (req, res, next) => {
  res.render('movies/form');
}

module.exports.doCreate = (req, res, next) => {
  const movie = new Movie(req.body);

  movie.save()
    .then(movie => { res.redirect('/movies' )});
}

module.exports.edit = (req, res, next) => {
  Promise.all([
    Celebrity.find(),
    Movie.findById(req.params.id)
  ])
  .then((results) => {
    const celebrities = results[0];
    const movie = results[1]

    res.render('movies/form', { movie, celebrities })
  })
}

module.exports.doEdit = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      movie.set(req.body);

      movie.save()
        .then((movie) => { res.redirect('/movies' )});
    })
}

module.exports.get = (req, res, next) => {
    Movie.findById(req.params.id)
      .populate('celebrity')
      .then(movie => { res.render('movies/detail', { movie })
       });
  }

module.exports.delete = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(movie => res.redirect('/movies'));
}
