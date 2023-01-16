import http from './httpService';
import config from '../config.json';

const moviesAPI = config.apiUrl + '/movies';

function movieUrl(id){
  return `${moviesAPI}/${id}`;
}

export function getMovies() {
    return http.get(moviesAPI);
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export async function saveMovie(movie) {
  if(movie._id){
    let body = {...movie};
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }

  return http.post(moviesAPI, movie);
}

export async function deleteMovie(id) {
  return http.delete(movieUrl(id));
}
  