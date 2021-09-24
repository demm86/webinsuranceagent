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

    retrieveUser(name, id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/users/${name}/todos/${id}`);
    }

    deleteUser(name, id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().delete(`${JPA_API_URL}/users/${name}/todos/${id}`);
    }

    updateUser(name, id, todo) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo);
    }

    createUser(name, todo) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().post(`${JPA_API_URL}/users/${name}/todos/`, todo);
    }

}

export default new UsersDataService()