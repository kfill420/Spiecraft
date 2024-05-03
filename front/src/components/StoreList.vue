<script setup>
  import { ref, onMounted } from 'vue';
  import ProductItem from './ProductItem.vue';
  import { fetchAllProductsData } from '@/components/service/database';

  const products = ref([]);

  const fetchProduct = async () => {
    try {
      const response = await fetchAllProductsData();
      products.value = response;
    } catch (error) {
      console.log('error fetching: ', error);
    }
  }

  onMounted(() => {
    fetchProduct();
  });
  
</script>

<template>
  <div class="store-container">
    <h1 class="title is-2">Trésors de poivre</h1>
    <div class="is-flex is-flex-direction-row is-flex-wrap-wrap store">
      <ProductItem v-for="product in products" :key="product.key" :id="product.id" :name="product.name" :description="product.description" :price="product.price" />
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
