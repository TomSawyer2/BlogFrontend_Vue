import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/index',
        name: 'Index',
        component: () => import('../views/Index.vue')
    },
    {
        path: '/addArticle',
        name: 'AddArticle',
        component: () => import('../views/AddArticle.vue')
    },
    {
        path: '/editArticle',
        name: 'EditArticle',
        component: () => import('../views/EditArticle.vue')
    },
    {
        path: '/detail/:id',
        name: 'Detail',
        component: () => import('../views/Detail.vue')
    },
    {
        path: '/categories',
        name: 'Categories',
        component: () => import('../views/Categories.vue')
    },
    {
        path: '/personalSpace',
        name: 'PersonalSpace',
        component: () => import('../views/PersonalSpace.vue')
    },
    {
        path: '/messageBoard',
        name: 'MessageBoard',
        component: () => import('../views/MessageBoard.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
