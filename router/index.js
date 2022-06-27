import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        // component: Home,
        // 按需引入
        component: () => import('../views/Main.vue'),
    },
    {
        path: '/exp1',
        name: 'exp1',
        component: () => import('../views/Exp1')
    },
    {
        path: '/exp2',
        name: 'exp2',
        component: () => import('../views/Exp2')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
