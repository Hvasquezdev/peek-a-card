import { ref } from 'vue';
import { uid } from '@/utils/uid';

const cardList = ref([]);

const getRandomVisible = () => Math.floor(Math.random() * 10) % 2 === 0;

const initDeck = (cardDeck) => {
  cardDeck.forEach((card) => {
    const listSize = cardList.value.length;
    const value = {
      value: card,
      visible: false,
      position: null,
      matched: false,
    };

    cardList.value[listSize] = {
      ...value,
      id: uid(),
      position: listSize,
      visible: getRandomVisible(),
    };
    cardList.value[listSize + 1] = {
      ...value,
      id: uid(),
      position: listSize + 1,
      visible: getRandomVisible(),
    };
  });
};

export const createDeck = (cards) => {
  initDeck(cards);

  return {
    cardList,
  };
};
