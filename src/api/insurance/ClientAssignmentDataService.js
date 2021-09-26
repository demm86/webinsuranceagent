//import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'
import AuthenticationService from '../../components/insurance/AuthenticationService';

class ClientAssignmentDataService {


    
    
    retrieveAllClientAssignment() {
       return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/clientAssignments`);
    }

    retrieveClientAssignment(name, id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/users/${name}/todos/${id}`);
    }

    deleteClientAssignment(name, id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().delete(`${JPA_API_URL}/users/${name}/todos/${id}`);
    }

    updateClientAssignment(name, id, todo) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo);
    }

    createClientAssignment(name, todo) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().post(`${JPA_API_URL}/users/${name}/todos/`, todo);
    }

}

export default new ClientAssignmentDataService()