<script setup>
import { ref, onMounted } from 'vue';
import ProductItem from './ProductItem.vue';
import { fetchAllProductsData } from '@/components/service/database';
import LoadingAnim from "./LoadingAnim.vue";

const products = ref([]);
const loading = ref(false);

const fetchProduct = async () => {
  loading.value = true;
  try {
    const response = await fetchAllProductsData();
    products.value = response;
  } catch (error) {
    console.log('error fetching: ', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchProduct();
});

</script>

<template>
  <div class="store-container">
    <h1 class="store-container_title title is-2">Trésors de poivre</h1>
    <div v-if="loading" class="store-container_loading-container container is-flex is-align-items-center is-justify-content-center">
      <LoadingAnim />
    </div>
    <div v-else
      class="is-flex is-flex-direction-row is-flex-wrap-wrap is-align-items-center is-justify-content-center store-container_store">
      <ProductItem class="" v-for="product in products" :key="product.key" :id="product.id" :name="product.name"
        :description="product.description" :price="product.price" />
    </div>
  </div>

</template>

<style scoped lang="scss">
.store-container {
  width: 100%;

  &_title {
    font-family: 'Cormorant', serif;
    font-weight: 900;
    color: #DADADA
  }

  &_store {
    width: 100%;
    gap: 0.5rem;
  }

  &_loading-container {
    width: 20%;
  }
}
</style>
