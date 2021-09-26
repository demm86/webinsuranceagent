//import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'
import AuthenticationService from '../../components/insurance/AuthenticationService';

class AgentAssignmentDataService {


    
    
    retrieveAllAgentAssignment() {
       return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/AgentAssignments`);
    }

    retrieveAgentAssignment(name, id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/users/${name}/todos/${id}`);
    }

    deleteAgentAssignment(name, id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().delete(`${JPA_API_URL}/users/${name}/todos/${id}`);
    }

    updateAgentAssignment(name, id, todo) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo);
    }

    createAgentAssignment(name, todo) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().post(`${JPA_API_URL}/users/${name}/todos/`, todo);
    }

}

export default new AgentAssignmentDataService()