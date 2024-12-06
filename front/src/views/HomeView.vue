<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import StoreList from '../components/StoreList.vue';
import CarouselSlide from '../components/CarouselSlide.vue';
import HeaderMain from '../components/HeaderMain.vue';
import AuthModal from '@/components/AuthModal.vue';

const store = useStore();

const loginModalisOpen = computed(() => store.state.auth.loginModalIsOpen);

</script>

<template>
  <HeaderMain />
  <CarouselSlide />
  <StoreList />
  <AuthModal v-if="loginModalisOpen" />
</template>
