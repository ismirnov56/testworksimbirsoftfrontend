import axios from 'axios'

export default {
    state: {
        count: 0,
        notes: []
    },
    mutations: {
        updateCount(state, count){
            state.count = count
        },
        updateNotes(state, notes){
            state.notes = notes
        }
    },
    actions: {
        getNotes({commit}){
            return new Promise((resolve, reject) => {
                axios({url: 'http://127.0.0.1:8000/api/v1/notes/', method: 'GET', headers: {
                        'Content-type': 'application/json'
                    }})
                    .then(resp => {
                        commit('updateNotes', resp.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        getCounts({commit}){
            return new Promise((resolve, reject) => {
                axios({url: 'http://127.0.0.1:8000/api/v1/notescount/', method: 'GET', headers: {
                        'Content-type': 'application/json'
                    }})
                    .then(resp => {
                        commit('updateCount', resp.data.count)
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        createNote({commit}, data){
            return new Promise((resolve, reject) => {
                axios({url: 'http://127.0.0.1:8000/api/v1/notes/',data: JSON.stringify(data), method: 'POST', headers: {
                        'Content-type': 'application/json'
                    }})
                    .then(resp => {
                        console.log(resp.status)
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        deleteNote({commit}, id){
            return new Promise((resolve, reject) => {
                axios({url: 'http://127.0.0.1:8000/api/v1/notes/' + id, method: 'DELETE', headers: {
                        'Content-type': 'application/json'
                    }})
                    .then(resp => {
                        console.log(resp.status)
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
    },
    getters : {
        notesCount: state => state.count,
        notesList: state => state.notes
    }
}