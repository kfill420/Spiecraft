<script setup>
import logo from '/img/logo.png';
import connectBtn from '/img/ico/user-solid.svg';
import cartBtn from '/img/ico/cart-shopping-solid.svg';
import logoutBtn from '/img/ico/log-out.svg';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();

const isMenuActive = ref(false);

const logged = computed(() => store.state.auth.logged);
const username = computed(() => store.state.profile.profile.firstname);

const router = useRouter();

const logoutAction = () => {
  if (logged.value === true) {
    localStorage.removeItem('token');
    store.commit('auth/setLogged', false);
    router.push({ path: '/' });
  }
};

const toggleMenu = () => {
  document.getElementById('navbarBasicExample').classList.toggle('is-active');
}

const toggleModal = () => {
  store.commit('auth/setLoginModalIsOpen', true);
}

</script>

<template>
  <nav class="navbar mb-4" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="container-logo">
        <img :src="logo" width="100px">
      </router-link>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="toggleMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" :class="{ 'is-active': isMenuActive }" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          Recettes
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
            <p v-if="logged" class="salutation is-hidden-mobile">Bonjour {{ username }}</p>
            <a v-if="logged" class="icoLink m-2" @click="logoutAction()">
              <img class="ico" :src="logoutBtn" alt="lougout button" />
            </a>
            <a v-if="!logged" class="icoLink" @click="toggleModal">
              <img class="ico" :src="connectBtn" alt="connect button" />
              <span class="btnConnexion ml-2 is-hidden-tablet is-hidden-desktop">Connexion</span>
            </a>
            <RouterLink v-else to="/profil" class="icoLink m-2">
              <img class="ico" :src="connectBtn" alt="connect button" />
              
            </RouterLink>
            <router-link v-if="logged" to="/cart" class="icoLink m-2">
              <img class="ico" :src="cartBtn" alt="signup button" />
            </router-link>
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

a:hover {
  background-color: white;
}

.salutation {
  margin-right: 2rem;
  transform: translateY(-20%);
}

.btnConnexion {
  color: #4a4a4a
}

</style>
