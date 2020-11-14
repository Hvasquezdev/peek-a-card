import { ref, computed } from 'vue';
import { shuffleArray } from '@/utils/shuffleArray';

export const createGame = (cardList) => {
  const isPlaying = ref(false);

  const startGame = () => {
    restartGame();
    isPlaying.value = true;
  };

  const suffleCards = () => {
    cardList.value = shuffleArray(cardList.value, (first, second, i, j) => {
      first.position = i;
      second.position = j;
    });
  };

  const restartGame = () => {
    suffleCards();

    cardList.value = cardList.value.map((card) => ({
      ...card,
      matched: false,
      visible: false,
    }));
  };

  const status = computed(() => {
    if (remainingPairs.value === 0) {
      return 'Player wins!';
    }

    return `Remaining pairs: ${remainingPairs.value}`;
  });

  const remainingPairs = computed(() => {
    const list = Array.from(cardList.value);
    const remainingCards = list.filter((card) => card.matched === false).length;
    return remainingCards / 2;
  });

  return {
    isPlaying,
    startGame,
    suffleCards,
    restartGame,
    status,
    remainingPairs,
  };
};
