<template>
  <div class="card" @click="selectCard">
    <div v-if="visible" class="card-face is-front">
      {{ value }}
    </div>
    <div v-else class="card-face is-back">
      Back
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    value: {
      type: Number,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    position: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const selectCard = () => emit('select-card', { position: props.position })

    return {
      selectCard
    }
  }
}
</script>

<style scoped>
.card {
  border: 5px solid #ccc;
  position: relative;
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
}

.card-face.is-front {
  background: red;
  color: white;
}

.card-face.is-back {
  background: blue;
  color: white;
}
</style>