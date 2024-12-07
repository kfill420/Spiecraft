<script setup>
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  name: String,
  content: [String, Object],
  radioButton: Boolean,
  data: String
});

const handleClickBtn = () => {
  switch (props.data) {
    case 'firstname':
      store.commit('profile/setProfileModal', { isOpen: true, type: 'firstname' });
      break;
    case 'lastname':
    store.commit('profile/setProfileModal', { isOpen: true, type: 'lastname' });
      break;
    case 'mail':
    store.commit('profile/setProfileModal', { isOpen: true, type: 'email' });
      break;
    case 'password':
    store.commit('profile/setProfileModal', { isOpen: true, type: 'password' });
      break;
    case '2fa':
    store.commit('profile/setProfileModal', { isOpen: true, type: '2fa' });
      break;
    default:
      console.log('default');
  }
}
</script>

<template>
  <div class="is-flex is-flex-direction-row is-justify-content-space-between">
    <div class="is-flex is-flex-direction-column">
      <span class="labelTitle">{{ name }}</span>
      <span>{{ content }}</span>
    </div>
    <div class="is-flex">
      <button v-if=!radioButton class="button is-rounded button_classic" @click="handleClickBtn">Modifier</button>
      <div v-else>
        <div class="field">
          <input id="switchRoundedDefault" type="checkbox" name="switchRoundedDefault" class="switch is-rounded">
          <label for="switchRoundedDefault"></label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.labelTitle {
  display: block;
  font-weight: 900;
}

.field {
  transform: scale(1.5);
}
</style>
