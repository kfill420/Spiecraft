<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const errorMessage = computed(() => store.state.profile.profileModalError);

const profileModalType = computed(() => store.state.profile.profileModalType);

const translation = {
  firstname: 'Prénom',
  lastname: 'Nom',
  password: 'Mot de passe',
  email: 'Email',
};

const formProfilData = ref({
  firstname: '',
  lastname: '',
  password: '',
  email: '',
});

const closeModal = () => {
  store.commit('profile/setProfileModal', { isOpen: false, type: '' });
};

const handleSubmit = () => {
  store.dispatch('profile/updateProfile', { type: profileModalType.value, value: formProfilData.value[profileModalType.value]});
};
</script>

<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      
        <header class="modal-card-head">
          <p class="modal-card-title">Modification</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <form @submit.prevent="handleSubmit">
            <div class="login-field">
              <label :for="profileModalType">{{ translation[profileModalType] }}</label>
              <input :id="profileModalType" v-model="formProfilData[profileModalType]" class="input" :type="profileModalType == 'password' ? 'password' : 'text'" required>
            </div>
            <div class="buttons">
              <button type="submit" class="button is-primary">Enregistrer</button>
              <button type="button" class="button" @click="closeModal">Annuler</button>
            </div>
          <span class="error">{{ errorMessage }}</span>
        </form>
        </section>

      
    </div>
  </div>
</template>

<style scoped lang="scss">
.error {
  bottom: 0;
  color: #9B0202;
  font-weight: 500;
}

.buttons {
  margin: 1rem 0 0 0;
}
</style>
