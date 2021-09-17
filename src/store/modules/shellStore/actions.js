import CaseService from "@/services/CaseService"
import BrandService from "@/services/BrandService"

const setCart = ({ commit }, payload) => {
    commit('CART_UPDATED', payload);
};

const addToCart = ({ commit }, payload) => {
    commit('CART_APPENDED', payload);
};

const incrementQuantity = ({ commit }, payload) => {
    commit('INCREMENT_QUANTITY', payload);
};

const decrementQuantity = ({ commit }, payload) => {
    commit('DECREMENT_QUANTITY', payload);
};

const removeItem = ({ commit }, payload) => {
    commit('REMOVE_ITEM', payload);
};

const fetchCases = async ({ commit }, payload) => {
    CaseService.getCasesByPhoneId(payload).then(res => {
        commit('SET_CASE_INFO', res.data);
    });
};

const fetchBrand = async ({ commit }) => {
    BrandService.getBrands().then(res => {
        commit('SET_BRANDS', res.data);
    });
};

export default {
    setCart,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    fetchCases,
    fetchBrand
};