<template>
  <h1>Peek a card</h1>

  <section class="game-board">
    <Card
      v-for="(card, i) in cardList"
      :key="`card-${i}`"
      :value="card"
    />
  </section>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'App',
  components: {
    Card
  },
  setup() {
    const cardList = []

    for (let i = 0; i < 16; i++) {
      cardList.push(i)      
    }

    return {
      cardList
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
