/*
Шаблон создания заметок и валидации их
Если количество символов меньше 1 то, неудастся создать заметку
*/


<template>
  <div class="w-25 mx-auto border p-3 rounded">
    <b-form @submit="create">
      <div class="form-group">
        <label for="note">Заметка:</label>
        <b-textarea v-model="note" type="text" id="note" placeholder="Введите заметку"></b-textarea>
        <p><small class="text-muted">Минимальная длина заметки 1 символ</small></p>
      </div>
      <p class="text-danger" v-if="!$v.note.minLength">Длина заметки меньше 1 символа</p>
      <b-button variant="dark" type="submit" :disabled="formValid">Создать</b-button>
    </b-form>
  </div>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators'


export default {
  name: "CreateNote",
  data() {
    return {
      note: "",
    };
  },
  validations: {
    note: {
      required,
      minLength: minLength(1)
    },
  },
  computed: {
    formValid() {
      return this.$v.$invalid
    },
  },
  methods: {
    create(event) {
      event.preventDefault()
      let data = {
        note: this.note,
      };
      this.$store.dispatch('createNote', data)
          .then(() => this.$router.push('/'))
          .catch(err => console.error(err))
    }
  }
}
</script>