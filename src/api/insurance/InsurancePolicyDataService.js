import { API_URL, JPA_API_URL } from '../../Constants'
import AuthenticationService from '../../components/insurance/AuthenticationService';

class InsurancePolicyDataService{

    retrieveAllInsurancePolicy() {



        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/insurancePolicy`);
       
      
     }

     retrieveInsurancePolicyAlias(name) {
       
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/insurancePolicyAlias/${name}`);
    }

    retrieveInsurancePolicy(name, id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/insurancePolicy/${name}/todos/${id}`);
    }

    deleteinsurancePolicy(name, id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().delete(`${JPA_API_URL}/insurancePolicy/${name}/todos/${id}`);
    }

    updateinsurancePolicy(name, id, todo) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().put(`${JPA_API_URL}/insurancePolicy/${name}/todos/${id}`, todo);
    }

    createinsurancePolicy(name, todo) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().post(`${JPA_API_URL}/insurancePolicy/${name}/todos/`, todo);
    }

}
export default new InsurancePolicyDataService()