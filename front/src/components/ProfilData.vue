<script setup>
import { computed } from 'vue';
import ProfileDataInfo from '../components/ProfileDataInfo.vue';
import ProfileDataInfoModal from './ProfileDataInfoModal.vue';
import { useStore } from 'vuex';

const store = useStore();

const profileDataInfoModalIsOpen = computed(() => store.state.profile.profileModalIsOpen);
const profileData = computed(() => store.state.profile.profile);

</script>

<template>
  <div class="is-flex is-justify-content-center profile-data-container">
    <div class="is-flex is-flex-direction-column profile-data-subcontainer">
      <h1 class="title is-3">Connexion</h1>
      <div class="containerDataInfos">
        <ProfileDataInfo class="containerDataInfos-element" name="Prénom" :content="profileData.firstname" data="firstname" />
        <ProfileDataInfo class="containerDataInfos-element" name="Nom" :content="profileData.lastname" data="lastname" />
        <ProfileDataInfo class="containerDataInfos-element" name="Email" :content="profileData.email" data="mail" />
        <ProfileDataInfo class="containerDataInfos-element" name="Mot de passe" content="*******" data="password" />
        <ProfileDataInfo class="containerDataInfos-element" name="Vérification en 2 étapes" data="2fa"
          content="Ajouter un niveau de difficulté" :radioButton="true" />
      </div>
      <ProfileDataInfoModal v-if="profileDataInfoModalIsOpen" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-data-subcontainer {
    width: 100%;
}

h1 {
  font-family: 'Cormorant', serif;
  font-weight: 900;
  color: #DADADA
}

.containerDataInfos {
  display: flex;
  flex-direction: column;
  border: 1px solid RGBA(218, 218, 218, 0.1);
  border-radius: 10px;
  color: #DADADA;

  &-element {
    border-bottom: 1px solid RGBA(218, 218, 218, 0.1);
    padding: 1rem;

    &:last-child {
      border: none;
    }
  }
}
</style>
