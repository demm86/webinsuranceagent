//import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'
import AuthenticationService from '../../components/insurance/AuthenticationService';

class EmployeeDataService {




    retrieveAllEmployees() {

        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/employee`);

    }

    retrieveEmployee(id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/employee/${id}`);
    }

    deleteEmployee(id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().delete(`${JPA_API_URL}/api/employee/${id}`);
    }

    updateEmployee(employee) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().put(`${JPA_API_URL}/api/employee`, employee);
    }

    createEmployee(employee) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().post(`${JPA_API_URL}/api/employee`, employee);
    }

}

export default new EmployeeDataService()
