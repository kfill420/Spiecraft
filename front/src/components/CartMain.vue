<script setup>
import { ref, onMounted } from 'vue';
import CartArticle from './CartArticle.vue';
import { fetchCartData } from '@/components/service/database';
import { jwtDecode } from 'jwt-decode';

const products = ref([]);

const fetchCart = async () => {
  try {
    const decoded = jwtDecode(localStorage.getItem('token'));
    const response = await fetchCartData(decoded.userId);
    products.value = response;
    console.log(products.value);
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
    <div class="is-flex is-flex-direction-column is-flex-wrap-wrap store">
      <CartArticle v-for="product in products" :key="product.key" :id="product.id" :name="product.Product.name"
        :description="product.Product.description" :price="product.price" />
    </div>
  </div>
</template>

<style scoped></style>
