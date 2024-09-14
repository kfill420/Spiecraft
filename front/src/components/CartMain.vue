<script setup>
import { ref, onMounted } from 'vue';
import ProductItem from './ProductItem.vue';
import { fetchCartData } from '@/components/service/database';

const products = ref([]);

const fetchCart = async () => {
  try {
    const response = await fetchCartData();
    products.value = response;
  } catch (error) {
    console.log('error fetching: ', error);
  }
}

onMounted(() => {
  fetchCart();
});

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
