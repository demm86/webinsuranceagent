//import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'
import AuthenticationService from '../../components/insurance/AuthenticationService';

class RoleDataService {

    retrieveAllRoles() {

        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/rol`);

    }

    retrieveRole(id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/rol/${id}`);
    }

    deleteRole(id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().delete(`${JPA_API_URL}/api/rol/${id}`);
    }

    updateRole(employee) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().put(`${JPA_API_URL}/api/rol`, employee);
    }

    createRole(employee) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().post(`${JPA_API_URL}/api/rol`, employee);
    }

}

export default new RoleDataService()