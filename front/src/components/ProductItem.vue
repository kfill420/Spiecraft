<script setup>
  defineProps({
    name: String,
    description: String,
    price: Number
  })
</script>

<template>

  <div class="card flex">
    <div class="card-image">
      <figure class="image is-4by3">
        <img src="@/assets/poivre.jpg" alt="image de poivr">
      </figure>
    </div>
    <div class="card-content">
      <p class="title is-4 mb-2">{{ name }}</p>
      <p class="title is-6 mb-2">{{ description }}</p>
      <p class="title is-5 mb-2" >{{ price }}€</p>
      <select class="select is-fullwidth mb-2">
        <option>Poids - 5g</option>
        <option>Poids - 20g</option>
        <option>Poids - 20g</option>
      </select>
      <button class="button is-primary is-fullwidth">Ajouter au panier</button>
    </div>

  </div>
</template>

<style scoped>
.card {
  width: 19.2%;
  min-width: 180px;
}

.card-content {
  background-color: #EDEDED;
}
</style>
