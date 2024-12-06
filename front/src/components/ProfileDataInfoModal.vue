<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const errorMessage = ref(null);

const profileModalType = computed(() => store.state.profile.profileModalType);

const closeModal = () => {
  store.commit('profile/setProfileModalIsOpen', false);
  store.commit('profile/setProfileModalType', '');
}

const translation = {
  firstname: 'Prénom',
  lastname: 'Nom',
  password: 'Mot de passe',
  mail: 'Email',
}

const formProfilData = ref({
  firstname: '',
  lastname: '',
  password: '',
  mail: '',
})

const handleSubmit = () => {
  try {
    store.dispatch('profile/updateProfile', { type: profileModalType.value, value: formProfilData.value[profileModalType.value]});
    store.commit('profile/setProfileModalIsOpen', false);
  } catch {
    errorMessage.value = 'Erreur lors de la modification';
  }
}
</script>

<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      <form @submit.prevent="handleSubmit">
        <header class="modal-card-head">
          <p class="modal-card-title">Modification</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
            <div class="login-field">
              <label :for="profileModalType">{{ translation[profileModalType] }}</label>
              <input :id="profileModalType" v-model=formProfilData[profileModalType] class="input" type="text" required>
            </div>
          <span class="error">{{ errorMessage }}</span>
        </section>
        <footer class="modal-card-foot">
          <div class="buttons">
            <button type="submit" class="button is-success">Enregistrer</button>
            <button class="button" @click="closeModal">Annuler</button>
          </div>
        </footer>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
