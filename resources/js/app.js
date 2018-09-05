require('./bootstrap');
import Vue from 'vue';
import Vuex from 'vuex';

import router from './routes';
import store from './store';

import App from './App.vue';

axios.interceptors.response.use(null, (error) => {
    if (error.response.status == 401) {
        store.commit('logout');
        router.push('/login');
    }
});

const app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
