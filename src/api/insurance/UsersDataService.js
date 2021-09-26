//import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'
import AuthenticationService from '../../components/insurance/AuthenticationService';

class UsersDataService {




    retrieveAllUsers() {

        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/users`);

    }

    retrieveUserAlias(name) {

        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/userAlias/${name}`);
    }

    retrieveUser(id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/user/${id}`);
    }

    deleteUser(id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().delete(`${JPA_API_URL}/api/user/${id}`);
    }

    updateUser(user) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().put(`${JPA_API_URL}/api/user`, user);
    }

    createUser(user) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().post(`${JPA_API_URL}/api/user`, user);
    }

}

export default new UsersDataService()