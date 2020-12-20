import Vue from  'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import SignIn from "@/views/SignIn";
import SignUp from "@/views/SignUp";
import ListNotes from "@/views/ListNotes";
import CreateNote from "@/views/CreateNote";
import store from '../store';
Vue.use(Router)

/*
* маршрутизация приложения
* */
let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: "/login",
            name: 'SignIn',
            component: SignIn,
        },
        {
            path: "/register",
            name: 'SignUp',
            component: SignUp,
        },
        {
            path: '/noteslist',
            name: 'NotesList',
            component: ListNotes,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/createnote',
            name: 'CreateNote',
            component: CreateNote,
            meta: {
                requiresAuth: true
            }
        }
    ]
})


// проверка доступа, к некоторым страницам требуется наличие аутентификации
router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router
