//import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'
import AuthenticationService from '../../components/insurance/AuthenticationService';

class PolicyStatusDataService {


    
    
    retrieveAllPolicyStatus() {



       return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/policystatus`);
      
     
    }

    retrievePolicyStatusName(name) {
       
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/policystatus/${name}`);
    }

    retrievePolicyStatus(name, id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/policystatus/${name}/todos/${id}`);
    }

    deletePolicyStatus(name, id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().delete(`${JPA_API_URL}/policystatus/${name}/todos/${id}`);
    }

    updatePolicyStatus(name, id, todo) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().put(`${JPA_API_URL}/policystatus/${name}/todos/${id}`, todo);
    }

    createPolicyStatus(name, todo) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().post(`${JPA_API_URL}/policystatus/${name}/todos/`, todo);
    }

}

export default new PolicyStatusDataService()