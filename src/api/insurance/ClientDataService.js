//import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'
import AuthenticationService from '../../components/insurance/AuthenticationService';

class ClientDataService {

    retrieveAllClients() {

       return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/client`);
    }

    retrieveClient(id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/client/${id}`);
    }

    deleteClient(id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().delete(`${JPA_API_URL}/api/client/${id}`);
    }

    updateClient(client) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().put(`${JPA_API_URL}/api/client`, client);
    }

    createClient(client) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().post(`${JPA_API_URL}/api/client`, client);
    }

}

export default new ClientDataService()