import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from '../store';
import Axios from 'axios';
import Vuelidate from 'vuelidate'

/*
Основа приложения, где происходит подключение главных компонент
Если в храниище браузера есть токен, то автомотически система понимает, что сейчаспользователь авторизован и
для удобства в headers апросов на Backend помещается токен
* */

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
