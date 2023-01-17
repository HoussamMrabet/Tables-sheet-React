import http from './httpService';
import config from '../config.json';

const userApi = config.apiUrl + '/users';

export function register(user){
    return http.post(userApi,{
        email: user.username,
        password: user.password,
        name: user.name
    });
}