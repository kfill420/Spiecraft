<script setup>

</script>

<template>
  <div class="store-container">
    <h1 class="title is-2">Panier</h1>
    <div class="is-flex is-flex-direction-row is-flex-wrap-wrap store">
      <ProductItem v-for="product in products" :key="product.key" :id="product.id" :name="product.name"
        :description="product.description" :price="product.price" />
    </div>
  </div>
</template>

<style scoped></style>
