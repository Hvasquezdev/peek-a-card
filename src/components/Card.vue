<template>
  <div class="card">
    {{ value }}
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    value: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.card {
  border: 5px solid #ccc;
}
</style>