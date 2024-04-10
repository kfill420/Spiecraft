<script setup>
import { ref } from 'vue';

  defineProps({
    modalIsOpen: Boolean,
  })
  
  const emits = defineEmits(['toggleModal']);

  const closeModal = () => {
    emits('toggleModal');
  }

  const loginFormSelected = ref(true);

  const toggleForm = () => {
    loginFormSelected.value = !loginFormSelected.value;
  }

</script>

<template>
  
  <div class="modal" :class="{ 'is-active': modalIsOpen }">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <ul v-if="loginFormSelected" class="tab-group">
          <li class="tab active" ><span class="active">Se connecter</span></li>
          <li class="tab"><a @click="toggleForm">S'inscrire</a></li>
        </ul>
        <ul v-if="!loginFormSelected" class="tab-group">
          <li class="tab"><span class="active">S'inscrire</span></li>
          <li class="tab"><a @click="toggleForm">Se connecter</a></li>
        </ul>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <form :class="{ formActive : loginFormSelected }">
          <div class="login-field">
            <input type="text" name="" required>
            <label>Email</label>
          </div>
          <div class="login-field">
            <input type="password" name="" required>
            <label>Password</label>
          </div>
          <button type="submit" class="button is-primary submitBtn">Se connecter</button>
        </form>
        <form :class="{ formActive : !loginFormSelected }">
          <div class="login-field login-field-demi">
            <div class="login-field">
              <input type="text" name="" required>
              <label>Prénom</label>
            </div>
            <div class="login-field">
              <input type="text" name="" required>
              <label>Nom</label>
            </div>
          </div>
          <div class="login-field">
            <input type="text" name="" required>
            <label>Email</label>
          </div>
          <div class="login-field">
            <input type="password" name="" required>
            <label>Password</label>
          </div>
          <button type="submit" class="button is-primary submitBtn">S'inscrire</button>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped>

header {
  width: 100%;
  text-align: end;
  width: 100%;

  ul {
  list-style: none;
  display: flex;
  width: 100%;
  justify-content: space-between;

  li {
  display: block;
  display: flex;
  align-items: center;

    a {
    text-decoration: none;
    }

    .active {
      font-size:x-large
    }
  }
}

  .delete {
    position: absolute;
    top: 12%;
    right: 2%;
  }
}

form {
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  display: none;
}

.formActive {
  display:flex
}

.login-field{
  position: relative;
  width: 100%;
}

.login-field-demi {
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

.login-field input {
  width: 100%;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  background: transparent;
}

.login-field label {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  transition: 0.4s;
}

.login-field input:focus ~ label, .login-field input:valid ~ label {
  top: -0.7rem;
  font-size: 0.7rem;
  color: #001453;
}

.submitBtn {
  width: 20%;
}

</style>
