<template>
  <table class="v-calendarContainer">
    <thead>
      <tr>
        <th></th>
        <th v-for="(dayOfWeek, columnIndex) in daysOfWeek"
        :key="columnIndex"
        :class="{ activeColumn: activeIndex === columnIndex }"
        >
          {{ dayOfWeek }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(hour, rowIndex) in d_hours"
      :key="rowIndex"
      >
        <td>
          <div class="hourTick" v-for="i in gap" :key="i">{{ hour + i }}</div>
        </td>
        <td v-for="(dayOfWeek, columnIndex) in daysOfWeek"
        :key="columnIndex"
        @click="onClick(columnIndex, rowIndex)"
        :draggable="isSelected(columnIndex, rowIndex)"
        @dragstart="onDragStart($event, columnIndex, rowIndex)"
        @dragover="onDragHover($event)"
        @dragleave="onDragLeave($event)"
        @drop="onDrop($event, columnIndex, rowIndex)"
        :class="{
          activeColumn: activeIndex === columnIndex,
          selectedCell: isSelected(columnIndex, rowIndex)
        }"
        >
        {{columnIndex +", "+ rowIndex}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Moment from 'moment'
import { toHour } from '../utils'

export default {
  name: 'Calendar',
  props: {
    // [13, 14, 16, 17, 22]
    hours: [Number],
    // Or :
    minHour: Number,
    maxHour: Number,
    gap: Number,
  },
  data: () => ({
    activeIndex: 0,
    selectedCells: [],
    d_hours: [],
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    dragged: null
  }),
  methods: {
    onDragStart(e, column, row) {
      this.dragged = [column, row]
    },
    onClick(column, row) {
      this.isSelected(column, row) 
       ? this.selectedCells.splice(this.selectedCells.findIndex(e => e[0] == column && e[1] == row), 1)
       : this.selectedCells.push([column, row])
    },
    onDragHover(e) {
      e.preventDefault()
      console.log(this.dragged)
      e.target.classList.add("onDragHover")
    },
    onDragLeave(e) {
      e.target.classList.remove("onDragHover")
    },
    onDrop(e, column, row) {
      this.onDragLeave(e)
      console.log("DROP", column, row)
      this.selectedCells.splice(this.selectedCells.findIndex(e => e[0] == this.dragged[0] && e[1] == this.dragged[1]), 1, [column, row])
      this.dragged = null
    },
    isSelected (column, row) {
      return (this.selectedCells.findIndex(e => e[0] === column && e[1] == row) != -1)
    },
    sortDaysOfWeek () {
      const todayIndex = Moment().day() - 1
      this.daysOfWeek = this.daysOfWeek.concat(this.daysOfWeek.splice(0, todayIndex))
    },
    formatProps () {
      const formatHours = (min, tMax, g) => {
        const max = tMax <= min ? tMax + 24 : tMax
        let res = []
        for (let i = 0; i < max - min; i += g) {
          res.push(toHour(min + i))
        }
        return res
      }
      this.d_hours = (this.hours && this.hours.length)
        ? this.hours
        : formatHours(this.minHour, this.maxHour, this.gap || 1)
    }
  },
  mounted () {
    this.sortDaysOfWeek()
    this.formatProps()
  }
}
</script>

<style lang="scss" scoped>
.v-calendarContainer {
  height: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  overflow-x: auto;
}
thead {
  tr {
    display: flex;
    th {
      box-sizing: border-box;
      flex: 1;
      &:first-of-type{
        flex: 0.5;
      }
    }
  }
}
tbody {
  flex: 1;
  display: flex;
  flex-direction: column;
  tr {
    flex: 1;
    display: flex;
    td {
      flex: 1;
      box-sizing: border-box;
      &:first-of-type{
        flex: 0.5;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
.activeColumn {
  background: rgba(0, 0, 0, 0.5)
}
.selectedCell {
  background-color: cyan;
}
.onDragHover {
  border: solid 3px black;
}
.hourTick {
  flex: 1;
}
</style>
