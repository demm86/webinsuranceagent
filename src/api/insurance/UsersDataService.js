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
        return AuthenticationService.getsetupAxiosInterceptors().delete(`${JPA_API_URL}/api/deleteUser/${id}`);
    }

    updateUser(user) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().put(`${JPA_API_URL}/api/updateUser`, user);
    }


    createUser(user) {
        console.log('executed service')
        console.log(user)
        return AuthenticationService.getsetupAxiosInterceptors().post(`${JPA_API_URL}/api/saveUser`, user);
    }

}

export default new UsersDataService()