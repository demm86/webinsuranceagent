//import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'
import AuthenticationService from '../../components/insurance/AuthenticationService';

class UsersDataService {




    retrieveAllProfiles() {

        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/profiles`);

    }

    retrieveProfileAlias(name) {

        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/profile/${name}`);
    }

    retrieveProfile(id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().get(`${JPA_API_URL}/api/profile/id/${id}`);
    }

    deleteProfile(id) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().delete(`${JPA_API_URL}/api/deleteProfile/${id}`);
    }

    updateProfile(profile) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().put(`${JPA_API_URL}/api/updateProfile`, profile);
    }


    createProfile(profile) {
        //console.log('executed service')
        return AuthenticationService.getsetupAxiosInterceptors().post(`${JPA_API_URL}/api/saveProfile`, profile);
    }

}

export default new UsersDataService()