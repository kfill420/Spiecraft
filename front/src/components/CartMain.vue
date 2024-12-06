<script setup>
import { ref, watchEffect } from 'vue';
import CartArticle from './CartArticle.vue';
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';

const store = useStore();
const products = ref([]);
const cart = computed(() => store.state.cart.cart);

onMounted(() => {
  store.dispatch('cart/fetchCart');
});

watchEffect(() => {
  products.value = cart.value;
});

</script>

<template>
  <div class="store-container">
    <h1 class="title is-2">Panier</h1>
    <div class="is-flex is-flex-direction-column is-flex-wrap-wrap store">
      <CartArticle v-for="product in products" :key="product.key" :id="product.product_id" :name="product.Product.name"
        :description="product.Product.description" :price="product.price" />
    </div>
  </div>
</template>

<style scoped></style>
