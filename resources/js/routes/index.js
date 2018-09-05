import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store'

Vue.use(VueRouter);

import Home from '../components/Home';
import Login from '../components/auth/Login';

import Customers from '../components/Customers';


const routes = [
    {
        path: '/',
        component: Home,
        meta: {
            requiresAuth: true,
        }
    }, {
        path: '/login',
        component: Login
    },
    {
        path: '/customers',
        component: Customers,
        meta: {
            requiresAuth: true,
        },
        children: [
            {path: '/', component: CustomersList},
            {path:'/new',component:NewCustomer},
            {path:'edit',component:EditCustomer}
        ]
    }
];

const router = new VueRouter({
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const currentUser = store.state.currentUser;
    if (requiresAuth && !currentUser) {
        next('/login');
    } else if (to.path == '/login' && currentUser) {
        next('/');
    } else {
        next();
    }

});

export default router;


