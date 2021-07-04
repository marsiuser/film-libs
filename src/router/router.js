import Vue from 'vue'
import Router  from 'vue-router'
import store from '../store'
import Home from '../assets/pages/Home'
import Login from '../assets/pages/auth/Login'
import Registration from '../assets/pages/auth/Registration'
import Task from '../components/Task'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes:[
        {
            path: '/',
            name:'home',
            component: Home,
            beforeEnter(to, from, next){
                store.getters.checkUser ? next() : next('/login')
            }
        },
        {
            path: '/task',
            name:'task',
            component: Task,
            beforeEnter(to, from, next){
                store.getters.checkUser ? next() : next('/login')
            }
        },
        {
            path: '/login',
            name:'login',
            component: Login
        },
        {
            path: '/registration',
            name:'registration',
            component: Registration
        }
    ]
})