<template>
  <div :class="classNames" class="card" @click="selectCard">
    <div class="card-face is-front">
      <figure class="face-value">
        <img :src="`/images/${value}.png`" :alt="value" />
      </figure>

      <figure class="icon-checkmark">
        <img src="/images/checkmark.svg" alt="Check mark" />
      </figure>
    </div>
    <div class="card-face is-back" />
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'Card',
  props: {
    value: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Number,
      required: true,
    },
    matched: {
      type: Boolean,
      default: false,
    },
    isPlaying: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const selectCard = () => {
      if (props.visible === true || props.isPlaying === false) {
        return;
      }

      emit('select-card', {
        position: props.position,
        faceValue: props.value,
      });
    };

    const classNames = computed(() => {
      return {
        'is-flipped': props.visible,
        'is-matched': props.matched,
      };
    });

    return {
      selectCard,
      classNames,
    };
  },
};
</script>

<style scoped>
.card {
  position: relative;
}

.card,
.card-face {
  border-radius: 14px;
  transition: 0.3s transform ease-in;
  transform-style: preserve-3d;
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 15px;
  backface-visibility: hidden;
}

.card-face.is-front {
  background-image: url('/images/card-bg.png');
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotateY(180deg);
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
