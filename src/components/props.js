const arrayEquals = (a1, a2) => a1.every((e, i) => e === a2[i])

const propTypes = {
  value: {
    validator: function (value) {
      return !value || typeof value === 'object'
    },
    default: []
  },
  hours: {
    validator: function (hours) {
      return !hours || (typeof hours === 'object' &&
        hours.reduce((acc, v, i) => acc && typeof v === 'number' && (!i || (hours[i - 1] !== v), true)) &&
        arrayEquals(hours.sort((a, b) => a - b), hours) &&
        hours[0] >= 0 && hours[hours.length - 1] <= 24
      )
    }
  },
  minHour: {
    validator: function (minHour) {
      return !minHour || (typeof minHour === 'number' && minHour >= 0 && minHour <= 24)
    }
  },
  maxHour: {
    validator: function (maxHour) {
      return !maxHour || (typeof maxHour === 'number' && maxHour >= 0 && maxHour <= 24)
    }
  },
  gap: {
    validator: function (gap) {
      return !gap || (typeof gap === 'number')
    }
  },
  svgPaths: {
    type: Array,
    default: () => [
      '',
      require('../assets/backgroundSVG/sky2.svg'),
      require('../assets/backgroundSVG/sky1.svg'),
      require('../assets/backgroundSVG/horizon.svg'),
      require('../assets/backgroundSVG/city2.svg'),
      require('../assets/backgroundSVG/city1.svg'),
      require('../assets/backgroundSVG/sun.svg')
    ]
  },
  colors: {
    type: Array,
    default: () => [
      '1E1823', // 0 Bastille
      '#242A37', // 2 dark Slate Gray
      '#3F6E77', // 4 Faded Jade
      '#6EB3B6', // 6 Neptune
      '#EB8F5E', // 7 Dark Salmon
      '#B1766F', // 9 Rosy Brown
      '#E5B395', // 11 Burly Wood
      '#FBEFBF', // 12 Light Goldenrod Yellow
      '#E5B395', // 14 Burly Wood
      '#B1766F', // 16 Rosy Brown
      '#EB8F5E', // 18 Dark Salmon
      '#6EB3B6', // 20 Neptune
      '#3F6E77', // 22 Faded Jade
      '#242A37' // 23 Dark Slate Gray
    ]
  },
  timeSeed: Number,
  noDisabled: {
    type: Boolean,
    default: false
  },
  disableHours: {
    type: Number,
    default: 2
  },
  formatCell: {
    type: Function,
    default: (slot, windowWidth) => slot.startDate
  },
  formatDays: {
    type: Function,
    default: (dayOfWeek, windowWidth) => (windowWidth <= 800 ? dayOfWeek.slice(0, 2) : dayOfWeek)
  },
  formatHours: {
    type: Function,
    default: (hour, windowWidth) => `${hour}:00-`
  }
}

export default propTypes
