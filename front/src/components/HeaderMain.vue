<script setup>
import logo from '/img/logo.png';
import connectBtn from '/img/ico/user-solid.svg';
import cartBtn from '/img/ico/cart-shopping-solid.svg';
import logoutBtn from '/img/ico/log-out.svg';
import AuthModal from '../components/AuthModal.vue';
import { ref, onUpdated, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';

const token = ref(localStorage.getItem('token'));
const modalIsOpen = ref(false);
const logged = ref(false);
const username = ref(null);
const isMenuActive = ref(false);

const router = useRouter();

const toggleModal = () => {
  modalIsOpen.value = !modalIsOpen.value;
};

const isLogged = () => {
  logged.value = !logged.value;
};

const logoutAction = () => {
  if (logged.value === true) {
    localStorage.removeItem('token');
    logged.value = false;
    router.push({ path: '/' });
  }
};

const handleUsername = (name) => {
  username.value = name;
};

const decodeFirstname = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token, 'secret');
      logged.value = !!token;
      username.value = decoded.fullnameData.firstnameData;
    } catch {
      console.log('Token invalid');
      logged.value = false;
      username.value = '';
    }
  } else {
    logged.value = false;
    username.value = '';
  }
}

onMounted(() => {
  window.addEventListener('storage', () => {
    console.log('storage event');
    token.value = localStorage.getItem('token');
  })
  decodeFirstname();
});

watch(token, (newToken) => {
  console.log('token', token.value);
  if (token.value) {
    decodeFirstname();
  }
});

onUpdated(() => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    username.value = userData.fullnameData.firstnameData;
    logged.value = !!username.value;
  }
});

const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value;
}

</script>

<template>

  <AuthModal :modalIsOpen="modalIsOpen" @toggleModal="toggleModal" :logged=logged @isLogged="isLogged"
    :username=username @setUsername="handleUsername" />

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
            <p v-if="logged" class="salutation">Bonjour {{ username }}</p>
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
