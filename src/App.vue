<template>
  <h1 class="game-title">Peek a card</h1>

  <transition-group tag="section" class="game-board" name="shuffle-cards">
    <Card
      v-for="card in cardList"
      :key="`card-${card.id}-${card.value}`"
      :value="card.value"
      :visible="card.visible"
      :position="card.position"
      :matched="card.matched"
      :is-playing="isPlaying"
      @select-card="flipCard"
    />
  </transition-group>

  <h2 v-if="isPlaying" class="game-status">
    {{ status }}
  </h2>

  <button
    v-if="!isPlaying"
    class="game-button game-play-btn"
    @click="startGame"
  >
    <img src="/images/play.svg" alt="Play icon" />
    Play game
  </button>
  <button v-else class="game-button game-restart-btn" @click="restartGame">
    <img src="/images/restart.svg" alt="Restart icon" />
    Restart game
  </button>
</template>

<script>
import { ref, watch, computed, onBeforeMount } from 'vue';
import { launchConfetti } from '@/utils/confetti';
import Card from '@/components/Card';

export default {
  name: 'App',
  components: {
    Card,
  },
  setup() {
    const cardList = ref([]);
    const userSelection = ref([]);
    const isPlaying = ref(false);

    const uuid = () =>
      `_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

    const status = computed(() => {
      if (remainingPairs.value === 0) {
        return 'Player wins!';
      }

      return `Remaining pairs: ${remainingPairs.value}`;
    });

    const remainingPairs = computed(() => {
      const list = Array.from(cardList.value);
      const remainingCards = list.filter((card) => card.matched === false)
        .length;
      return remainingCards / 2;
    });

    const generateCardList = () => {
      const cards = [
        'ghost',
        'candy',
        'bat',
        'cauldron',
        'cupcake',
        'moon',
        'pumpkin',
        'witch-hat',
      ];

      cards.forEach((card) => {
        const listSize = cardList.value.length;
        const value = {
          value: card,
          visible: false,
          position: null,
          matched: false,
        };

        const getRandomVisible = () => Math.floor(Math.random() * 10) % 2 === 0;

        cardList.value[listSize] = {
          ...value,
          id: uuid(),
          position: listSize,
          visible: getRandomVisible(),
        };
        cardList.value[listSize + 1] = {
          ...value,
          id: uuid(),
          position: listSize + 1,
          visible: getRandomVisible(),
        };
      });
    };

    const shuffleArray = (arr, cb) => {
      const arrToShuffle = Array.from(arr);

      for (let i = arrToShuffle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        if (j !== i) {
          [arrToShuffle[i], arrToShuffle[j]] = [
            arrToShuffle[j],
            arrToShuffle[i],
          ];

          if (cb) {
            cb(arrToShuffle[i], arrToShuffle[j], i, j);
          }
        }
      }

      return arrToShuffle;
    };

    const suffleCards = () => {
      cardList.value = shuffleArray(cardList.value, (first, second, i, j) => {
        first.position = i;
        second.position = j;
      });
    };

    const startGame = () => {
      restartGame();
      isPlaying.value = true;
    };

    const restartGame = () => {
      suffleCards();

      cardList.value = cardList.value.map((card) => ({
        ...card,
        matched: false,
        visible: false,
      }));
    };

    const flipCard = (payload) => {
      cardList.value[payload.position].visible = true;

      userSelection.value = [...userSelection.value, payload];
    };

    onBeforeMount(() => {
      generateCardList();
      suffleCards();
    });

    watch(remainingPairs, (current) => {
      if (current === 0) {
        launchConfetti();
      }
    });

    watch(
      userSelection,
      (current) => {
        if (current.length === 2) {
          const cardOne = current[0];
          const cardTwo = current[1];

          if (cardOne.faceValue === cardTwo.faceValue) {
            cardList.value[cardOne.position].matched = true;
            cardList.value[cardTwo.position].matched = true;
          } else {
            const timeOut = setTimeout(() => {
              cardList.value[cardOne.position].visible = false;
              cardList.value[cardTwo.position].visible = false;

              clearTimeout(timeOut);
            }, 1000);
          }

          userSelection.value.length = 0;
        }
      },
      { deep: true }
    );

    return {
      cardList,
      flipCard,
      status,
      remainingPairs,
      restartGame,
      startGame,
      isPlaying,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-image: url('/images/page-bg.png');
  background-color: #00070c;
  width: 100%;
  min-height: 100vh;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.game-title {
  font-size: 32px;
  font-weight: bold;
  text-transform: capitalize;
  color: #fff;
  margin-bottom: 20px;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(2, 140px);
  grid-template-rows: repeat(8, 180px);
  /* grid-template-columns: repeat(4, 120px);
  grid-template-rows: repeat(4, 140px); */
  column-gap: 20px;
  row-gap: 20px;
  justify-content: center;
}

.game-status {
  font-size: 24px;
  font-weight: 500;
  text-transform: capitalize;
  color: #fff;
  margin-top: 20px;
}

.game-button {
  background: #59f72c;
  border: none;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-transform: capitalize;
  border-radius: 4px;
  font-size: 18px;
}

.game-button img {
  margin-right: 10px;
}

.game-restart-btn,
.game-play-btn {
  margin-top: 20px;
}

.game-restart-btn {
  background: #ffd600;
}

.shuffle-cards-move {
  transition: 0.8s transform ease-in;
}

@media screen and (min-width: 600px) {
  .game-board {
    grid-template-columns: repeat(4, 120px);
    grid-template-rows: repeat(4, 150px);
  }
}

@media screen and (min-width: 1260px) {
  .game-board {
    grid-template-columns: repeat(4, 140px);
    grid-template-rows: repeat(4, 180px);
  }
}
</style>
