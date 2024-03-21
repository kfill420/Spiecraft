<script setup>
  import ProductItem from './ProductItem.vue';
</script>

<template>
  <div class="store-container">
    <h1 class="title is-2">Trésors de poivre</h1>
    <div class="is-flex is-flex-direction-row is-flex-wrap-wrap store">
      <ProductItem name="Poivre noire" description="Un poivre très doux" :price="5" />
      <ProductItem name="Poivre blanc" description="Un poivre spécial" :price="7" />
      <ProductItem name="Poivre noire" description="Un poivre très doux" :price="5" />
      <ProductItem name="Poivre blanc" description="Un poivre spécial" :price="7" />
      <ProductItem name="Poivre noire" description="Un poivre très doux" :price="5" />
      <ProductItem name="Poivre blanc" description="Un poivre spécial" :price="7" />
    </div>
  </div>
  
</template>

<style scoped>
  .store-container {
    width: 100%;
  }

  h1 {
    font-family: 'Cormorant', serif;
    font-weight: 900;
    color: #DADADA
  }

  .store {
    width: 100%;
    gap: 0.5rem;
  }
</style>
