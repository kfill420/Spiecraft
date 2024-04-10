<script setup>
  import { ref } from 'vue';

  const props = defineProps({
    id: Number,
    name: String,
    description: String,
    price: Array
  });

  const weightSelected = ref('0');
  const productRef = ref(null);
  const imageRef = ref(null);

  const getImageUrl = (id) => {
    return `src/assets/product/${id}.jpg`;
  }

  const zoomIn = () => {
    productRef.value.classList.add('productZoomed');
    imageRef.value.classList.add('imageZoomed');
  }

  const zoomOut = () => {
    productRef.value.classList.remove('productZoomed');
    imageRef.value.classList.remove('imageZoomed');
  }

</script>

<template>

  <div class="card flex is-clipped" ref="productRef" @mouseover="zoomIn" @mouseout="zoomOut">
    <div class="card-image">
      <figure class="image is-4by3" ref="imageRef">
        <img :src="getImageUrl(id)" alt="image de poivre">
      </figure>
    </div>
    <div class="card-content">
      <p class="title is-4 mb-2">{{ name }}</p>
      <p class="title is-6 mb-2">{{ description }}</p>
      <p class="title is-5 mb-2" >{{ price[weightSelected] }}€</p>
      <select v-model="weightSelected" @change="handleWeightChange" class="select is-fullwidth mb-2">
        <option value="0">Poids - 5g</option>
        <option value="1">Poids - 10g</option>
        <option value="2">Poids - 20g</option>
      </select>
      <button class="button is-primary is-fullwidth">Ajouter au panier</button>
    </div>

  </div>
</template>

<style scoped>
.card {
  width: 19.2%;
  min-width: 180px;
  transition: transform 0.2s;
  cursor: pointer;
}

.image {
  transition: transform 0.2s;
}

.card-content {
  background-color: #EDEDED;
}

.productZoomed {
  transform: scale(1.05);
}

.imageZoomed {
  transform: scale(1.15);
}

</style>
