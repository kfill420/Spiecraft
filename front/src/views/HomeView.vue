<script setup>
import { RouterLink, RouterView } from 'vue-router'
import StoreList from '../components/StoreList.vue';
import CarouselSlide from '../components/CarouselSlide.vue';
import HeaderMain from '../components/HeaderMain.vue';
</script>

<template>
  <HeaderMain />
  <CarouselSlide />
  <StoreList />
</template>

<style scoped>
  @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>
