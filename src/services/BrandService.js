import axios from 'axios';

export default {
    async getBrands() {
        return axios
            .get(process.env.VUE_APP_apiUrl + "/brand/get/all")
            .then((response) => {
                return response;
            });
    }
}