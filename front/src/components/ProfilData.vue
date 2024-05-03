<script setup>
  import { ref, onMounted } from 'vue';
  import ProfileDataInfo from '../components/ProfileDataInfo.vue';
  const datas = ref({});
  const username = ref('');

  onMounted(() => {
    datas.value = JSON.parse(localStorage.getItem('userData'));
    username.value = `${datas.value.fullnameData.firstnameData} ${datas.value.fullnameData.lastnameData}`;
  });
</script>

<template>
    <div class="is-flex is-justify-content-center profile-data-container">
      <div class="is-flex is-flex-direction-column profile-data-subcontainer">
      <h1 class="title is-3">Connexion</h1>
      <div class="containerDataInfos">
        <ProfileDataInfo class="containerDataInfos-element" name="Nom" :content="username" />
        <ProfileDataInfo class="containerDataInfos-element" name="Email" :content="datas.emailData" />
        <ProfileDataInfo class="containerDataInfos-element" name="Mot de passe" content="*******" />
      </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
  .profile-data-subcontainer {
    width: 40vw;
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
