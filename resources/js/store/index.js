import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {getLocalUser} from "../helpers/auth";

const user = getLocalUser();

export default new Vuex.Store({
    state: {
        currentUser: user,
        isLogged: !!user,
        loading: false,
        auth_error: null,
        customers: []
    },
    getters: {
        isLoading(state) {
            return state.loading;
        },
        isLoggedIn(state) {
            return state.isLogged;
        },
        currentUser(state) {
            return state.currentUser;
        },
        authError(state) {
            return state.auth_error;
        },
        customers(state) {
            return state.customers;
        }
    },
    mutations: {
        login(state) {
            state.loading = true;
            state.auth_error = null;
        },
        loginSuccess(state, payload) {
            state.auth_error = null;
            state.isLogged = true;
            state.loading = false;
            state.currentUser = Object.assign({}, payload.user, {token: payload.access_token});

            localStorage.setItem('user', JSON.stringify(state.currentUser));
        },
        loginFailed(state, payload) {
            state.loading = false;
            state.auth_error = payload.error;
        },
        logout(state) {
            localStorage.removeItem('user');
            state.isLogged = false;
            state.currentUser = null;
        },
        updateCustomers(state, payload) {
            state.customers = payload;
        }
    },
    actions: {
        login(context) {
            context.commit('login');
        },
        getCustomers(context) {
            axios.get('api/customers')
                .then((response) => {
                    context.commit('updateCustomers', response.data.customers);
                });
        }
    }
})