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
</template>

<script>
import { ref, watch } from 'vue'
import Card from '@/components/Card'

export default {
  name: 'App',
  components: {
    Card
  },
  setup() {
    const cardList = ref([])
    const userSelection = ref([])
    const status = ref('')

    for (let i = 0; i < 16; i++) {
      cardList.value.push({
        value: (i % 2 === 0) ? 1 : 2,
        visible: false,
        position: i,
        matched: false
      })      
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
          status.value = 'Matched!'

          cardList.value[cardOne.position].matched = true
          cardList.value[cardTwo.position].matched = true
        } else {
          status.value = 'Mismatch!'

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
      status
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
