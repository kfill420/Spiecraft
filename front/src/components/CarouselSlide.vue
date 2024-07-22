<template>
  <Carousel :autoplay="3500" :wrap-around="true">
    <Slide v-for="(image) in images" :key="image.id">
      <div class="carousel__item">
        <img :src="isSmallScreen ? image.urlSmall : image.url" />
      </div>
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
        { id: 1, url: 'img/1.png', urlSmall: 'img/full/1.png' },
        { id: 2, url: 'img/2.png', urlSmall: 'img/full/2.png' },
        { id: 3, url: 'img/3.png', urlSmall: 'img/full/3.png' },
        { id: 4, url: 'img/4.png', urlSmall: 'img/full/4.png' },
        { id: 5, url: 'img/5.png', urlSmall: 'img/full/5.png' }
      ],
      viewport: window.innerWidth
    }
  },
  computed: {
    isSmallScreen() {
      return this.viewport < 780;
    }
  },
  methods: {
    handleResize() {
      this.viewport = window.innerWidth;
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
});
</script>

<style>
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