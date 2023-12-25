import React from 'react';
import "./App.css"
import MovieApp from './component/MovieApp.js';
import ApiAPP from './component/ApiAPP.js';

const MovieComponent = () => {
 
  return (
    <div>
     <MovieApp/>
     <ApiAPP/>
    </div>
  );
};

export default MovieComponent;
