# vue-slot-calendar

### [\[ demo here \]](https://tbayet.github.io/SlotCalendar/)

## Installation
First install the package

```sh
npm install --save vue-slot-calendar
```

Then import it and use it

```js
import VueSlotCalendar from 'vue-slot-calendar'

<template>
	<vue-slot-calendar :minHour=8 :maxHour=22 :gap=2 v-model="selectedSlots" />
</template>
<script>
export  default {
  name: 'app',
  components: {
    VueSlotCalendar
  },
  data: () => ({
    selectedSlots: []
  })
}
</script>
```

## Usage
### Props:

| prop | type | default | description |
|--|--|--|---|
| v-model | Array [Object] | [] | all selected slots with informations |
| hours | Array [Number] | undefined | hours range/ticks, ex: [8, 10, 12, 14] |
| minHour | Number | undefined | first hour of the range |
| maxHour | Number | undefined | last hour of the range |
| gap | Number | undefined | gap of the range |
| svgPaths | Array [String], Array[Array[String, Object]] | [['.../link.svg', {...config}], ...] | custom SVGs at background |
| colors | Array [String] | ['#1E1823', '#242A37' '#3F...'] | colors for SVGs, ordered, to scale with the day hours (0 to 24) |
| timeSeed | Number | undefined (now) | unix() milliseconds to set beggining date of the calendar |
| noDisabled | Boolean | false | prevent locking past hours |
| disableHours | Number | 2 | the next hours that are locked |
| formatCell | Function | (slot, windowWidth) => slot.startDate | string displayed in cells |
| formatDays | Function | (strDayOfWeek, windowWidth) => ... | string displayed for day names |
| formatHours | Function | (hour, windowWidth) => `${hour}:00-` | string displayed for hours |

You have to set either **hours** or **minHour/maxHour/gap**, required.