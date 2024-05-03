<script setup>
  defineProps({
    name: String,
    content: [String, Object],
  });

</script>

<template>
  <div class="">
    <span class="labelTitle" >{{ name }}</span>
    <span>{{ content }}</span>
  </div>
</template>

<style scoped>
  .labelTitle {
    display: block;
    font-weight: 900;
  }
</style>
