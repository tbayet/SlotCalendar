<template>
  <div id="app">
    <vue-slot-calendar :minHour=8 :maxHour=22 :gap=2 v-model="test" />
    {{ JSON.stringify(this.test) }}
  </div>
</template>

<script>
import VueSlotCalendar from '../dist/vue-slot-calendar.esm'

export default {
  name: 'app',
  components: {
    VueSlotCalendar
  },
  data: () => ({
    test: []
  }),
  mounted () {
    // console.log(VueSlotCalendar)
  }
}
</script>

<style>
#app {
  border: solid 1px black;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 95vh;
}
</style>
