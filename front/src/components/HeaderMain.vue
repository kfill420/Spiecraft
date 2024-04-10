<script setup>
import logo from '@/assets/img/logo.png'
import connectBtn from '@/assets/img/ico/user-solid.svg'
import cartBtn from '@/assets/img/ico/cart-shopping-solid.svg'
import AuthModal from '../components/AuthModal.vue';
import { ref } from 'vue';

const modalIsOpen = ref(false);

const toggleModal = () => {
  modalIsOpen.value = !modalIsOpen.value;
}

</script>

<template>

  <AuthModal :modalIsOpen="modalIsOpen" @toggleModal="toggleModal"/>

  <nav class="navbar mb-4" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="container-logo" href="/">
      <img :src="logo" width="100px">
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
        Nos produits
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          Plus
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            A propos de nous
          </a>
          <a class="navbar-item">
            La livraison
          </a>
          <a class="navbar-item">
            Nous contacter
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons ">
          <a class="icoLink m-2" @click="toggleModal">
            <img class="ico" :src="connectBtn" alt="connect"/>
          </a>
          <a class="icoLink m-2">
            <img class="ico" :src="cartBtn" alt="signup"/>
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<style scoped>
  .icoLink {
    height: 150%;
  }

  .ico {
    width: 20px;
    height: 20px;
  }

  a:hover{
    background-color: white;
  }
</style>
