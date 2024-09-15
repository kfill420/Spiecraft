<script setup>

defineProps({
  name: String,
  content: [String, Object],
  radioButton: Boolean,
});

</script>

<template>
  <div class="is-flex is-flex-direction-row is-justify-content-space-between">
    <div class="is-flex is-flex-direction-column">
      <span class="labelTitle">{{ name }}</span>
      <span>{{ content }}</span>
    </div>
    <div class="is-flex">
      <button v-if=!radioButton class="button is-rounded button_classic">Modifier</button>
      <div v-else>
        <div class="field">
          <input id="switchRoundedDefault" type="checkbox" name="switchRoundedDefault" class="switch is-rounded">
          <label for="switchRoundedDefault"></label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.labelTitle {
  display: block;
  font-weight: 900;
}

.field {
  transform: scale(1.5);
}
</style>
