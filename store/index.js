import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth';
import notes from './modules/notes'

Vue.use(Vuex)

/*
Описание хранилища основные модули расположены в папке modules
* */

export default new Vuex.Store({
    modules: {
        auth,
        notes
    }
})