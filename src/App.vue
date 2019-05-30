<template>
  <div id="app">
    <!-- <vue-slot-calendar :minHour=0 :maxHour=12 :gap=2 v-model="test" /> -->
    <vue-slot-calendar :minHour=0 :maxHour=14 :gap=2 v-model="selectedSlots" />
    <div>
      <h2>v-model data</h2>
      <ul>
        <li v-for="(e, i) in selectedSlots" :key="i">
          {{ e }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import VueSlotCalendar from './components/VueSlotCalendar'

export default {
  name: 'app',
  components: {
    VueSlotCalendar
  },
  data: () => ({
    selectedSlots: []
  })
}
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  & > div:last-of-type {
    overflow-y: auto;
    width: 30vw;
    margin: 10px;
    border: solid 3px black;
    text-align: left;
    & > h2 {
      text-align: center;
      border-bottom: 1px solid black;
      padding: 10px;
    }
  }
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 95vh;
}
</style>
