import axios from 'axios'

/*
Организация аутентификации и регистрации
* */

export default {
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user : {}
    },
    mutations: {
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state, token, user){
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state){
            state.status = 'error'
        },
        logout(state){
            state.status = ''
            state.token = ''
        },
    },
    // основные функции, которые обеспеечивают запросы на backend
    actions: {
        login({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: 'http://127.0.0.1:8000/auth/token/login', data: JSON.stringify(user), method: 'POST', headers: {
                        'Content-type': 'application/json'
                    }})
                    .then(resp => {
                        console.log(resp.status)
                        const token = 'Token ' + resp.data.auth_token
                        const thisuser = user.email
                        localStorage.setItem('token', token)
                        console.log('Token ' + token)
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, thisuser)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        register({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: 'http://127.0.0.1:8000/auth/users/', data: JSON.stringify(user), method: 'POST', headers: {
                        'Content-type': 'application/json'
                    }})
                    .then(resp => {
                        console.log(resp.status)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        reject(err)
                    })
            })
        },
        logout({commit}){
            return new Promise((resolve, reject) => {
                axios({url: 'http://127.0.0.1:8000/auth/token/logout', method: 'POST' })
                    .then(resp => {
                        console.log(resp.status)
                        commit('logout')
                        delete axios.defaults.headers.common['Authorization']
                        localStorage.removeItem('token')
                        resolve(resp)
                    })
                    .catch(err => {
                        console.log('No error')
                        reject(err)
                    })
            })
        }
    },
    getters : {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    }
}