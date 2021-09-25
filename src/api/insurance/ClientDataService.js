//import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'
import AuthenticationService from '../../components/insurance/AuthenticationService';

class ClientDataService {


    
    
    retrieveAllClients() {



       return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/client`);
      
     
    }

    retrieveClientName(name) {
       
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/client/${name}`);
    }

    retrieveClient(name, id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/client/${name}/todos/${id}`);
    }

    deleteClient(name, id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().delete(`${JPA_API_URL}/client/${name}/todos/${id}`);
    }

    updateClient(name, id, todo) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().put(`${JPA_API_URL}/client/${name}/todos/${id}`, todo);
    }

    createClient(name, todo) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().post(`${JPA_API_URL}/client/${name}/todos/`, todo);
    }

}

export default new ClientDataService()