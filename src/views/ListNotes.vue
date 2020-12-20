/*
Шаблон получения списка заметок, заметки можно удалять
Так как было решено устанавливать время создание заметки на Backend надо переопределять время на фронте
Для этого с помощью метода getDate который принимает строку времени полученную с Backend API происходит конвертирование
времени в текущий часовой пояс и приводится в нормальное представление для пользователя
*/

<template>
  <div class="card-columns">
    <div class="card" v-for="note in notesList">
      <div class="card-body">
        <p class="card-text font-weight-bold">{{note.note}}</p>
      </div>
      <div class="card-body text-right">
        <b-button :id="note.id" variant="danger" size="sm" class="text-right" v-on:click="deleteNote">Удалить</b-button>
      </div>
      <div class="card-footer text-muted font-italic font-weight-light">
        <p class="text-left">Дата создания: {{getDate(note.date_create)}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListNotes",
  computed : {
    notesList: function () {
      return this.$store.getters.notesList
    },
  },
  mounted() {
    this.$store.dispatch('getNotes');
  },
  methods: {
    getDate(s){
      let data = new Date(s)
      return data.toLocaleString()
    },
    deleteNote(event){
      // забираем из DOM дерева id заметки и отправляем на Backend запрос на удаление
      this.$store.dispatch('deleteNote', event.target.id)
          .then(()=>this.$router.push('/'))
          .catch(err => console.log(err))
    }
  }
}

</script>

<style>

</style>