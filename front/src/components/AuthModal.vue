<script setup>
  import { ref } from 'vue';

  const isOpen = ref(false);

  const closeModal = () => {
    console.log(isOpen.value);
    isOpen.value = false;
  }

</script>

<template>
  <div class="modal" :class="{ 'is-active': isOpen }">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <ul class="tab-group">
          <li class="tab active"><a href="#signup">S'inscrire</a></li>
          <li class="tab"><a href="#login">Se connecter</a></li>
        </ul>
      </header>
      <section class="modal-card-body">

      </section>
    </div>
  </div>
</template>

<style scoped>

</style>
