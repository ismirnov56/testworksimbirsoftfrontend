/*
Основной компонент приложения определяет его шапку
Если пользователь не авторизован ему будут доступны только На главную, авторизация и аутентификация
В противном случае На главную, Список заметок, Создать заметку
*/

<template>
  <div id="app" class="app-wrapper">
    <header class="bg-dark">
      <b-navbar class="w-75" type="dark" variant="dark">
        <b-navbar-brand class="navbar-brand">Заметки</b-navbar-brand>
        <b-navbar-nav>
          <b-nav-item href="/">На главную</b-nav-item>
          <b-nav-item v-if="isLoggedIn" href="/noteslist">Список заметок</b-nav-item>
          <b-nav-item v-else href="/register">Регистрация</b-nav-item>
          <b-nav-item v-if="isLoggedIn" href="/createnote">Создать заметку</b-nav-item>
          <b-nav-item v-else href="/login">Авторизация</b-nav-item>
          <b-nav-item v-if="isLoggedIn" @click="logout">Выйти</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </header>
    <div class="container-fluid my-5">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  computed : {
    // метод проверки авторизации
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },
  methods: {
    // метод для выхода из аккаунта доступно
    logout: function () {
      this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/').catch(()=>{});
          })
    }
  },
};

</script>
<style>
.navbar-brand {
  font-size: 20pt;
}
</style>
