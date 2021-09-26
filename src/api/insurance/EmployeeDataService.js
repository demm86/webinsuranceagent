//import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'
import AuthenticationService from '../../components/insurance/AuthenticationService';

class UsersDataService {




    retrieveAllEmployees() {

        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/Employee`);

    }

    retrieveEmployeeAlias(name) {

        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/userAlias/${name}`);
    }

    retrieveEmployee(id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/Employee/${id}`);
    }

    deleteEmployee(id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().delete(`${JPA_API_URL}/api/Employee/${id}`);
    }

    updateEmployee(employee) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().put(`${JPA_API_URL}/api/Employee`, employee);
    }

    createEmployee(employee) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().post(`${JPA_API_URL}/api/Employee`, employee);
    }

}

export default new UsersDataService()