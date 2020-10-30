<template>
  <div :class="{ 'is-matched': matched }" class="card" @click="selectCard">
    <div v-if="visible" class="card-face is-front">
      <figure class="face-value">
        <img :src="`/images/${value}.png`" :alt="value">
      </figure>

      <figure class="icon-checkmark">
        <img src="/images/checkmark.svg" alt="Check mark" />
      </figure>
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
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    position: {
      type: Number,
      required: true
    },
    matched: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const selectCard = () => {
      if (props.visible === true) { return }
      
      emit('select-card', {
        position: props.position,
        faceValue: props.value
      })
    }

    return {
      selectCard
    }
  }
}
</script>

<style scoped>
.card {
  position: relative;
}

.card,
.card-face {
  border-radius: 14px;
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 15px;
}

.card-face.is-front {
  background-image: url('/images/card-bg.png');
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-face.is-front .face-value {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-face.is-back {
  background-image: url('/images/card-bg-empty.png');
  color: white;
}

.icon-checkmark {
  display: flex;
  position: absolute;
  right: 10px;
  bottom: 10px;
  transform: scale(0);
  transition: all 0.3s;
}

.card.is-matched .icon-checkmark {
  animation-name: bounce;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

@keyframes bounce {
  0% {
    transform: scale(0);
  }
  45% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>