import axios from 'axios';

export default {
    async getCasesByPhoneId(id) {

        let url = "/case/get/" + (id ? ("by-phone-id/" + id) : "all");
        return axios
            .get(process.env.VUE_APP_apiUrl + url)
            .then((response) => {
                return response;
            });
    },
    async getCasesById(id) {

        let url = "/case/get/" + id;
        return axios
            .get(process.env.VUE_APP_apiUrl + url)
            .then((response) => {
                return response;
            });
    }
}