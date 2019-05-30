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
    validator: function (svgPaths) {
      return (
        svgPaths.reduce((acc, v, i) => acc && (typeof v === 'string' ||
          (typeof v === 'object' &&
          v.length && typeof v[0] === 'string' &&
          (v.length === 1 || typeof v[1] === 'object'))
        ), true)
      )
    },
    default: () => [
      '',
      require('../assets/backgroundSVG/sky2.svg'),
      [require('../assets/backgroundSVG/sun.svg'), { zIndex: 8, maskRepeat: 'no-repeat', maskSize: 'auto 90%' }],
      require('../assets/backgroundSVG/sky1.svg'),
      require('../assets/backgroundSVG/horizon.svg'),
      require('../assets/backgroundSVG/city2.svg'),
      require('../assets/backgroundSVG/city1.svg')
    ]
  },
  colors: {
    type: Array,
    default: () => [
      '#1E1823', // 0 Bastille
      '#242A37', // 2 dark Slate Gray
      '#3F6E77', // 4 Faded Jade
      '#6EB3B6', // 6 Neptune
      '#EB8F5E', // 8 Dark Salmon
      '#E5B395', // 10 Burly Wood
      '#FBEFBF', // 12 Light Goldenrod Yellow
      '#B1766F', // 14 Rosy Brown
      '#6EB3B6', // 16 Neptune
      '#3F6E77', // 18 Faded Jade
      '#242A37', // 20 Dark Slate Gray
      '#1E1823' // 22 Bastille
    ]
  },
  timeSeed: {
    type: Number,
    default: undefined
  },
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
