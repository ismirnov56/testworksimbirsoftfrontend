/*
Шаблон авторизации аналогично SignUp
*/

<template>
  <div class="w-25 mx-auto border p-3 rounded">
    <b-form @submit="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <b-input v-model="email" type="email" id="email" placeholder="Email..."></b-input>
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <b-input v-model="password" type="password" id="password" placeholder="Пароль..."></b-input>
        <p><small class="text-muted">Минимальная длина пароля 6 символов</small></p>
      </div>
      <p class="text-danger" v-if="!$v.email.email">Введите правильно email</p>
      <p class="text-danger" v-if="!$v.password.minLength">Длина пароля меньше 6 символов</p>
      <p class="text-danger" v-if="this.error">{{backErrors}}</p>
      <b-button variant="dark" type="submit" :disabled="formValid">Войти</b-button>
      <p class="mt-3">Ещё не зарегистрированы? <router-link to="/register">Регистрация</router-link>
      </p>
    </b-form>
  </div>
</template>

<script>
import {required, minLength, email} from 'vuelidate/lib/validators'

export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
  },
  computed: {
    formValid() {
      return this.$v.$invalid
    },
    backErrors() {
      return this.error.non_field_errors[0]
    }
  },
  methods: {
    login: function (event) {
      this.error = "";
      event.preventDefault();
        let data = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch('login', data)
            .then(() => this.$router.push('/'))
            .catch(err => this.error = JSON.parse(err.request.response))
    }
  }
};
</script>

<style scoped>
</style>