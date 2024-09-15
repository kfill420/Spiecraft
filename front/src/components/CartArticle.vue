<script setup>
import { getImageUrl } from './utils/utils';

const props = defineProps({
  id: Number,
  name: String,
  description: String,
  price: String
});

const deleteArticleFromCart = () => {
  console.log('delete article from cart');
}

</script>

<template>
  <div class="cart_article is-flex is-flex-direction-row is-flex-wrap-wrap store mt-5">
      <img class="cart_article_image" :src="getImageUrl(id)" alt="image de poivre">
      <div class="cart_article_infos ml-4">
        <p class="title is-6 mb-2 has-text-weight-medium">{{ name }}</p>
        <p class="title is-7 mb-2 has-text-weight-normal">{{ description }}</p>
        <p class="title is-6 mb-2 has-text-weight-medium">{{ price }}€</p>
        <button class="button is-small is-rounded button_classic" @click="deleteArticleFromCart">Supprimer</button>
      </div>
  </div>
</template>

<style scoped lang="scss">
.cart_article {

  &_image {
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }

  &_infos p {
    color: #DADADA;
  }
}
</style>
