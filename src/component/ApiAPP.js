import React, {useEffect, useState} from 'react'
import axios from 'axios';

function ApiAPP() {
  const [movies, setMovies] = useState([]);
    useEffect(() => {
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
            console.log('API Response:', response.data); // Log the API response
            setMovies(response.data.movies);
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchData();
      }, []);
      
  return (
    <div>
      
    </div>
  )
}

export default ApiAPP;
