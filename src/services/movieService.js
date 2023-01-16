import http from './httpService';
import config from '../config.json';

const moviesAPI = config.apiUrl + '/movies';

export function getMovies() {
    return http.get(moviesAPI);
}

export function getMovie(id) {
  return http.get(moviesAPI + '/' + id);
}

export async function saveMovie(movie) {
  if(movie._id){
    let body = {...movie};
    delete body._id;
    return http.put(moviesAPI + '/' + movie._id, body);
  }

  return http.post(moviesAPI, movie);
}

export async function deleteMovie(id) {
  return http.delete(moviesAPI+'/'+id);
}
  