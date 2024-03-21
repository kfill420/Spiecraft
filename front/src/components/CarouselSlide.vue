<template>
  <Carousel :autoplay="3500" :wrap-around="true">
    <Slide v-for="(image) in images" :key="image.id">
      <div class="carousel__item">
        <img :src="image.url"/>
      </div>
      <!--<img :src="image.url"/>-->
    </Slide>

    <template #addons>
      <Pagination />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'DefaultCarousel',
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {
      images: [
        {id: 1, url: 'src/assets/img/1.png'},
        {id: 2, url: 'src/assets/img/2.png'},
        {id: 3, url: 'src/assets/img/3.png'},
        {id: 4, url: 'src/assets/img/4.png'},
        {id: 5, url: 'src/assets/img/5.png'}
      ]
    }
  }
});
</script>

<style>
img{

}

.carousel__item {
  min-height: 200px;
  max-height: 35vh;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>