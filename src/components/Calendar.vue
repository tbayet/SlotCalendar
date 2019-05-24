<template>
  <table cellspacing="0" cellpadding="0" class="v-calendarContainer">
    <thead>
      <tr>
        <th></th>
        <th v-for="(dayOfWeek, columnIndex) in daysOfWeek"
        :key="columnIndex"
        >
          {{ responsiveSentence(dayOfWeek) }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(hour, rowIndex) in d_hours"
      :key="rowIndex">
        <td>
          <div class="hourTick">{{ hour }}:00-</div>
          <div v-if="rowIndex === d_hours.length - 1" class="hourTick">{{ toHour(hour + (gap || (d_hours[1] - d_hours[0]))) }}:00-</div>
        </td>
        <td v-for="(dayOfWeek, columnIndex) in daysOfWeek"
        :key="columnIndex"
        @click="onClick(columnIndex, rowIndex)"
        :class="{
          deadCell: isDead(columnIndex, rowIndex),
          selectedCell: isSelected(columnIndex, rowIndex)
        }"
        >
          {{ isSelected(columnIndex, rowIndex) ? isSelected(columnIndex, rowIndex).startDate : null }}
        </td>
      </tr>
      <background-svg :color="colorPicker(d_hours)" :paths="svgPaths"/>
    </tbody>
  </table>
</template>

<script>
import Moment from 'moment'
import backgroundSvg from './City.svg.vue'
import { toHour, formatHours, colorPicker, durationFromNow } from '../utils'

export default {
  name: 'Calendar',
  props: {
    value: { validator: function (value) {
      return !value || typeof value === 'object'
    } },
    // [13, 14, 16, 17, 22]
    hours: { validator: function (hours) {
      return !hours || (typeof hours === 'object' &&
        hours.reduce((acc, v, i) => acc && typeof v === 'number' && (!i || (hours[i - 1] !== v), true)) &&
        hours.sort((a, b) => a - b).equals(hours) &&
        hours[0] >= 0 && hours[hours.length - 1] <= 24
      )
    } },
    // Or :
    minHour: { validator: function (minHour) {
      return !minHour || (typeof minHour === 'number' && minHour >= 0 && minHour <= 24)
    } },
    maxHour: { validator: function (maxHour) {
      return !maxHour || (typeof maxHour === 'number' && maxHour >= 0 && maxHour <= 24)
    } },
    gap: { validator: function (gap) {
      return !gap || (typeof gap === 'number')
    } },
    /**
     * {
     *  sun: "",
     *  city: "",
     *  sky1: "",
     *  sky2: "",
     * }
     */
    svgPaths: Object,
    timeSeed: Number // ms
  },
  components: {
    'background-svg': backgroundSvg
  },
  data: () => ({
    selectedCells: [],
    d_hours: [],
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    windowWidth: window.innerWidth
  }),
  methods: {
    colorPicker: colorPicker,
    toHour: toHour,
    onClick (column, row) {
      if (!this.isDead(column, row)) {
        this.isSelected(column, row)
          ? this.selectedCells.splice(this.selectedCells.findIndex(e => e.column === column && e.row === row), 1)
          : this.selectedCells.push(formatHours(this.d_hours, column, row, this.timeSeed))
        this.$emit('input', this.selectedCells)
      }
    },
    isSelected (column, row) {
      return (this.selectedCells.find(e => e.column === column && e.row === row))
    },
    isDead (column, row) {
      return durationFromNow(this.d_hours, column, row, this.timeSeed) <= 4
    },
    sortDaysOfWeek () {
      const todayIndex = Moment(this.timeSeed).day() - 1
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
    },
    responsiveSentence (str) {
      return (this.windowWidth <= 800 ? str.slice(0, 2) : str)
    },
    handleResize () {
      this.windowWidth = window.innerWidth
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    if (!(this.hours || (this.minHour && this.maxHour && this.gap)) ||
    (this.hours && (this.minHour || this.maxHour || this.gap)) ||
    this.minHour >= this.maxHour ||
    this.gap > this.maxHour - this.minHour) {
      throw new TypeError('invalid props', 'Calendar.vue')
    }
  },
  mounted () {
    this.sortDaysOfWeek()
    this.formatProps()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="scss" scoped>
.v-calendarContainer {
  font-size: 12px;
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
  min-width: 500px;
  tr {
    margin: 10px;
    display: flex;
    th {
      &:not(:first-of-type) {
        border-left: solid 1px grey;
      }
      font-size: 1.5em;
      flex: 1;
      &:first-of-type{
        min-width: 70px;
        flex: 0.5;
      }
    }
  }
}
tbody {
  min-width: 500px;
  min-height: 500px;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  tr {
    display: inline-block;
    &:hover{
      & > td:first-of-type > div:not(:first-of-type) {
        font-weight: 900;
        font-size: 1.5em;
      }
      & + tr > td:first-of-type > div:first-of-type {
        font-weight: 900;
        font-size: 1.5em;
      }
      & > td:first-of-type > div:first-of-type {
        font-weight: 900;
        font-size: 1.7em;
      }
    }
    &:first-of-type {
      margin-top: 5px;
    }
    &:last-of-type > td:not(:first-of-type) {
      margin-bottom: 5px;
    }
    flex: 1;
    display: flex;
    td {
      flex: 1;
      &:first-of-type {
        text-align: right;
        font-size: 1em;
        flex: 0.5;
        display: flex;
        flex-direction: column;
      }
      &:nth-of-type(2) {
        margin-left: 5px;
      }
      &:last-of-type {
        margin-right: 5px;
      }
      &:not(:first-of-type) {
        transition: background-color 0.3s ease-in-out, box-shadow 0.1s ease-out;
        &.selectedCell {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1em;
          position: relative;
          background-color: white;
        }
        &:not(.deadCell):not(.selectedCell):hover {
          cursor: pointer;
          box-shadow: inset 0 0 1px 2px rgba(255, 255, 255, 0.9);
        }
        &:not(.deadCell).selectedCell:hover {
          cursor: pointer;
          background-color: rgba(255,255,255,0.5);
          box-shadow: inset 0 0 1px 2px rgb(0,0,0);
        }
        &.selectedCell:before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: -1;
          box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.8);
        }
      }
    }
  }
}
.deadCell {
  background-color: rgba(0, 0, 0, 0.6);
  background-image: repeating-linear-gradient(to left top, transparent, transparent 5%, rgba(0,0,0,.3) 5%, rgba(0,0,0,.3) 10%);
  cursor: not-allowed;
}
.hourTick {
  flex: 1;
  background-color: white;
  margin-top: -12px;
  z-index: -1;
  transition: font-size 0.3s;
  padding-right: 10px;
  min-width: 70px;
  font-size: 1.3em;
  &:not(:first-of-type) {
    display:flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding-bottom: -5px;
  }
}
</style>
