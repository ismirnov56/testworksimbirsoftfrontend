/*
Основная страница
Использует 2 состояния, если пользователь авторизован, то мы выдаём количество заметок, в противном случае
формируется страницы незаригистрированного пользователя
*/

<template>
  <div class="w-50 mx-auto">
    <div v-if="isLoggedIn">
      <div>
        <h3>Количество заметок: {{notesCount}}</h3>
      </div>
      <div v-if="notesCount==0">
        <p class="mt-3">У вас нет заметок! Хотите создать? <router-link to="/createnote">Создать</router-link></p>
      </div>
      <div v-else>
        <p class="mt-3">У вас есть заметки! Хотите узнать, что у вас запланировано? <router-link to="/noteslist">Просмотреть</router-link></p>
        <p class="mt-3">Хотите оздать новую? <router-link to="/createnote">Создать</router-link></p>
      </div>
    </div>
      <div class="form-text" v-else>
        <h2>Добрый день, вас приветствует сервис для создания приватных заметок</h2>
        <h6>Вы не авторизованы</h6>
        <p class="mt-3">Уже есть аккаунт? <router-link to="/login">Вход</router-link></p>
        <p class="mt-3">Ещё не зарегистрированы? <router-link to="/register">Регистрация</router-link></p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
    notesCount : function (){ return this.$store.getters.notesCount}
  },
  mounted() {
    this.$store.dispatch('getCounts');
  }
};
</script>