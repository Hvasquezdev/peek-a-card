<template>
  <h1>Peek a card</h1>

  <section class="game-board">
    <Card
      v-for="(card, i) in cardList"
      :key="`card-${i}`"
      :value="card.value"
      :visible="card.visible"
      :position="card.position"
      :matched="card.matched"
      @select-card="flipCard"
    />
  </section>

  <h2>
    {{ status }}
  </h2>
  <button @click="restartGame">Restart game</button>
</template>

<script>
import { ref, watch, computed } from 'vue'
import Card from '@/components/Card'

export default {
  name: 'App',
  components: {
    Card
  },
  setup() {
    const cardList = ref([])
    const userSelection = ref([])

    const status = computed(() => {
      if (remainingPairs.value === 0) {
        return 'Player wins!'
      }

      return `Remaining pairs: ${remainingPairs.value}`
    })

    const remainingPairs = computed(() => {
      const list = Array.from(cardList.value)
      const remainingCards = list.filter((card) => (
        card.matched === false
      )).length
      return remainingCards / 2
    })

    for (let i = 0; i < 16; i++) {
      cardList.value.push({
        value: (i % 2 === 0) ? 1 : 2,
        visible: false,
        position: i,
        matched: false
      })      
    }

    const shuffleArray = (arr, cb) => {
      const arrToShuffle = Array.from(arr)

      for (let i = arrToShuffle.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))

        if (j !== i) {
          [arrToShuffle[i], arrToShuffle[j]] = [arrToShuffle[j], arrToShuffle[i]]

          if (cb) {
            cb(arrToShuffle[i], arrToShuffle[j], i, j)
          }
        }
      }

      return arrToShuffle
    }

    const suffleCards = () => {
      cardList.value = shuffleArray(cardList.value, (first, second, i, j) => {
        first.position = i
        second.position = j
      })
    }

    const restartGame = () => {
      suffleCards()

      cardList.value = cardList.value.map(card => ({
        ...card,
        matched: false,
        visible: false
      }))
    }

    const flipCard = (payload) => {
      cardList.value[payload.position].visible = true

      userSelection.value = [
        ...userSelection.value,
        payload
      ]
    }

    watch(userSelection, (current) => {
      if (current.length === 2) {
        const cardOne = current[0]
        const cardTwo = current[1]

        if (cardOne.faceValue === cardTwo.faceValue) {
          cardList.value[cardOne.position].matched = true
          cardList.value[cardTwo.position].matched = true
        } else {
          cardList.value[cardOne.position].visible = false
          cardList.value[cardTwo.position].visible = false
        }

        userSelection.value.length = 0
      }
    }, { deep: true })

    return {
      cardList,
      flipCard,
      userSelection,
      status,
      remainingPairs,
      restartGame
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  grid-template-rows: repeat(4, 100px);
  column-gap: 30px;
  row-gap: 30px;
  justify-content: center;
}
</style>
