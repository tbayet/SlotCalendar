<template>
  <div id="app">
    <Calendar :minHour=8 :maxHour=22 :gap=2 v-model="test" />
    {{ JSON.stringify(this.test) }}
  </div>
</template>

<script>
import Calendar from './components/Calendar.vue'

export default {
  name: 'app',
  components: {
    Calendar
  },
  data: () => ({
    test: []
  })
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
