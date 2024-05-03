<script setup>
import { ref, defineEmits } from 'vue';
import { signup, signin } from '@/components/service/database';

  defineProps({
    modalIsOpen: Boolean,
    isLogged: Boolean,
  });
  
  const emits = defineEmits(['toggleModal', 'isLogged', 'setUsername']);

  const closeModal = () => {
    emits('toggleModal');
  };

  const loginFormSelected = ref(true);
  const signupFormValue = ref({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });
  const signinFormValue = ref({
    email: '',
    password: ''
  });

  const errorMessage = ref(null);

  const toggleForm = () => {
    loginFormSelected.value = !loginFormSelected.value;
  }

  const submitSignupForm = async () => {
    const signupV = signupFormValue.value;
    await signup(signupV);
    closeModal();
  }

  const submitSigninForm = async () => {
    try {
      const signinV = signinFormValue.value;
      const response = await signin(signinV);
      const token = response.token
      localStorage.setItem('token', token);
      emits('isLogged');
      closeModal();
      errorMessage.value = null;
    } catch (error) {
      const errMess = error.response.data.errorMessage
      console.error(errMess);
      errorMessage.value = errMess;
    }
  }
  
</script>

<template>
  
  <div class="modal" :class="{ 'is-active': modalIsOpen }">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <ul v-if="loginFormSelected" class="tab-group">
          <li class="tab active" ><span class="active">Se connecter</span></li>
          <li class="tab clicable"><a class="toggleForm" @click="toggleForm">S'inscrire</a></li>
        </ul>
        <ul v-if="!loginFormSelected" class="tab-group">
          <li class="tab"><span class="active">S'inscrire</span></li>
          <li class="tab clicable"><a class="toggleForm" @click="toggleForm">Se connecter</a></li>
        </ul>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <form :class="{ formActive : loginFormSelected }" @submit.prevent="submitSigninForm">
          <div class="login-field">
            <input v-model="signinFormValue.email" type="text" required>
            <label>Email</label>
          </div>
          <div class="login-field">
            <input v-model="signinFormValue.password" type="password" required>
            <label>Password</label>
          </div>
          <button type="submit" class="button is-primary submitBtn">Se connecter</button>
        </form>
        <form :class="{ formActive : !loginFormSelected }" @submit.prevent="submitSignupForm">
          <div class="login-field login-field-demi">
            <div class="login-field">
              <input v-model="signupFormValue.firstname" type="text" required>
              <label>Prénom</label>
            </div>
            <div class="login-field">
              <input v-model="signupFormValue.lastname" type="text" required>
              <label>Nom</label>
            </div>
          </div>
          <div class="login-field">
            <input v-model="signupFormValue.email" type="text" required>
            <label>Email</label>
          </div>
          <div class="login-field">
            <input v-model="signupFormValue.password" type="password" required>
            <label>Password</label>
          </div>
          <button type="submit" class="button is-primary submitBtn">S'inscrire</button>
        </form>
          <span class="error">{{errorMessage}}</span>
      </section>
    </div>
  </div>
</template>

<style scoped>

header {
  width: 100%;
  text-align: end;
  width: 100%;

  .tab-group {
  list-style: none;
  display: flex;
  width: 100%;
  justify-content: space-between;

    li {
    display: block;
    display: flex;
    align-items: center;
    position: relative;

      a {
      text-decoration: none;
      }

      .active {
        font-size: x-large
      }


      .toggleForm {
        border-radius: 5px;
      }
      .toggleForm:after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 50%;
        width: 0;
        height: 2px;
        background-color: #00C4A7;
        transition: all 0.2s ease-in-out;
      }
      .toggleForm:hover:after {
        width: 100%;
        right: 0;
        transition: all 0.3s ease-in-out;
      }
    }
  }

  .delete {
    position: absolute;
    top: 8%;
    right: 1%;
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

.error {
  position: absolute;
  bottom: 0;
  color: #9B0202;
  font-weight: 900;
}

</style>
