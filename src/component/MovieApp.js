import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './MovieApp.css';

Modal.setAppElement('#root'); 

function MovieApp() {
  const [movies, setMovies] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://movies-api14.p.rapidapi.com/movies',
      headers: {
        'X-RapidAPI-Key': '68df74a627mshb2b63f4873f82f7p148afcjsn8955113f228c',
        'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setMovies(response.data.movies);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateSubmit = (e) => {
    e.preventDefault();

    if (!movies) {
      console.error('Movies data is not available.');
      return;
    }

    const filteredMovies = movies.filter(movie => {
      const releaseDate = new Date(movie.release_date);
      return releaseDate >= new Date(fromDate) && releaseDate <= new Date(toDate);
    });

    setMovies(filteredMovies);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (!movies) {
      console.error('Movies data is not available.');
      return;
    }

    const searchedMovies = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setMovies(searchedMovies);
  };

  const handleReset = () => {
    setFromDate('');
    setToDate('');
    setSearchQuery('');
    fetchData(); 
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className='container-1'>
        <form onSubmit={handleDateSubmit}>
          <label>From</label>
          <input type='date' value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <label>To</label>
          <input type='date' value={toDate} onChange={(e) => setToDate(e.target.value)} />
          <button type='submit'>Filter Movies</button>
        </form>
        <form onSubmit={handleSearchSubmit}>
          <label>Search Movie By Name</label>
          <input type='text' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <button type='submit'>Search Movie</button>
        </form>
        <button type='button' onClick={handleReset}>Reset</button>
        <br />
        <hr />
      </div>
      <div className='Movie-container'>
        <div className='movie-block'>
          {movies ? (
            movies.map(movie => (
              <div className='movie-cards' key={movie._id} onClick={() => openModal(movie)}>
                <h6>{movie.genres}</h6>
                <img src={movie.poster_path} alt={movie.title}></img>
                <h5>{movie.title}</h5>
                <h4>{movie.release_date}</h4>
              </div>
            ))
          ) : (
            <p>No movies available</p>
          )}
        </div>
      </div>
      <Modal
        isOpen={!!selectedMovie}
        onRequestClose={closeModal}
        contentLabel="Movie Details"
        className="Modal"
        overlayClassName="Overlay"
      >
        {selectedMovie && (
          <div className="Modal-content">
            <img src={selectedMovie.poster_path} alt={selectedMovie.title} />
            <div>
              <h2 style={{color:"red"}}>{selectedMovie.title}</h2>
              <h4>release-date : {selectedMovie.release_date}</h4>
              <br/>
              <h3>overview of the film:</h3>
              <p >{selectedMovie.overview}</p>
              <h3>genre:</h3>
              <p>{selectedMovie.genres.join(', ')}</p>
            </div>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>

    </>
  );
}

export default MovieApp;
