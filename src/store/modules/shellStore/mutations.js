const CART_UPDATED = (state, payload) => {
    state.cart = [];
    if (payload) {
        state.cart.push(payload)
    }
};

const CART_APPENDED = (state, payload) => {
    let found = state.cart.findIndex(x => x.phoneId == payload.phoneId && x.data.id == payload.data.id)
    if (found < 0) {
        payload.quantity = 1;
        state.cart.push(payload);
    }
    else {
        state.cart[found].quantity++;
    }
};

const INCREMENT_QUANTITY = (state, payload) => {
    let selectedCase = state.cart[payload];
    let caseInfo = selectedCase.data.phoneCases.find(x => x.phoneInfo.id == selectedCase.phoneId)
    if (selectedCase.quantity < caseInfo.quantity)
        selectedCase.quantity++;
};

const DECREMENT_QUANTITY = (state, payload) => {
    if (state.cart[payload].quantity > 0)
        state.cart[payload].quantity--;
};

const REMOVE_ITEM = (state, payload) => {
    state.cart.splice(payload, 1);
};

const SET_CASE_INFO = (state, payload) => {
    state.cases = payload;
};

const SET_BRANDS = (state, payload) => {
    state.brands = payload;
};

export default {
    CART_UPDATED,
    CART_APPENDED,
    INCREMENT_QUANTITY,
    DECREMENT_QUANTITY,
    REMOVE_ITEM,
    SET_CASE_INFO,
    SET_BRANDS
};