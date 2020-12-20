/*
Шаблон для регистрации
*/

<template>
  <div class="w-50 border rounded p-3 mx-auto">
    <b-form @submit="register">
      <div class="form-group">
        <label id="email">Email:</label>
        <b-input v-model="email" type="email" id="email" placeholder="Email..."></b-input>
      </div>
      <div class="form-group">
        <label id="password">Пароль:</label>
        <b-input v-model="password" type="password" id="password" placeholder="Пароль..."></b-input>
        <p><small class="text-muted">Минимальная длина пароля 6 символов, а также он должен состоять из символов и букв</small></p>
      </div>
      <div class="form-group">
        <label id="password-confirm">Повторите пароль:</label>
        <b-input id="password-confirm" type="password" v-model="password_confirmation" required placeholder="Повторите пароль..."></b-input>
      </div>
      <p class="text-danger" v-if="!$v.email.email">Введите правильно email</p>
      <p class="text-danger" v-if="!$v.password.minLength">Длина пароля меньше 6 символов</p>
      <p class="text-danger" v-if="!$v.password.oneSymbolAndOneNum">Несоответствие пароля</p>
      <p class="text-danger" v-if="$v.password.required && $v.password_confirmation.required && !$v.password_confirmation.sameAs">Введённые пароли не совпадают</p>
      <p class="text-danger" v-if="this.error">{{backErrors}}</p>
      <b-button variant="dark" type="submit" :disabled="formValid">Регистрация</b-button>
      <p class="mt-3">Уже есть аккаунт? <router-link to="/login">Вход</router-link>
      </p>
    </b-form>
  </div>
</template>
<script>
import {required, minLength, email, helpers, sameAs} from 'vuelidate/lib/validators'
const oneSymbolAndOneNum = helpers.regex('oneSymbolAndOneNum', /^(?=\S*?[a-zA-Z])(?=\S*?[0-9])\S*$/i);

export default {
  name: "SignUp",
  //Основные данные
  data() {
    return {
      email : "",
      password : "",
      password_confirmation : "",
      error: ""
    };
  },
  // валидация на frontend чтобы лишний раз не отправлять запросы на backend
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6),
      oneSymbolAndOneNum
    },
    password_confirmation: {
      required,
      sameAs: sameAs('password')
    },
  },
  computed: {
    // функция которая проверят валидацию на backend, а именно существование пользователя
    backErrors() {
      return this.error.email[0]
    },
    formValid() {
      return this.$v.$invalid
    },
  },
  methods: {
    // основные методы которые через Vuex осуществляют работу с Backend API
      register: function (event) {
        this.error = "";
        event.preventDefault();
        let data = {
          email: this.email,
          password: this.password,
        }
        this.$store.dispatch('register', data)
            .then(() => {
              this.$store.dispatch('login', data)
                  .then(() => this.$router.push('/'))
                  .catch(err => console.error(err))
            })
            .catch(err => this.error = JSON.parse(err.request.response))

    }
  }
};
</script>
<style>
</style>