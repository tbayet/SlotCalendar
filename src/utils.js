import Moment from 'moment'

export const toHour = number => number % 24

export const durationFromNow = (hours, column, row, timeSeed) => {
  const until = Moment(timeSeed).startOf('date').add(column, 'days').add(hours[row], 'hours').unix()
  const now = Moment().unix()
  return (Moment.duration((until - now) * 1000).asHours())
}

export const formatHours = (hours, column, row, timeSeed) => {
  const day = Moment(timeSeed).startOf('date').add(column, 'days')
  const dateFormat = 'dddd YY/MM/DD kk:mm'
  let res = {
    column: column,
    row: row,
    startTime: Moment(day).add(hours[row], 'hours').unix(),
    endTime: Moment(day).add(hours[(row + 1) % hours.length], 'hours').unix(),
    startDate: Moment(day).add(hours[row], 'hours').format(dateFormat),
    endDate: Moment(day).add(hours[(row + 1) % hours.length], 'hours').format(dateFormat)
  }
  res.duration = Moment.duration((res.endTime - res.startTime) * 1000).asHours()
  return res
}

export const colorPicker = hours => {
  const backgroundColor = color => {
    return (color >= 20
      ? '#332244'
      : color >= 16
        ? '#5566AA'
        : color >= 12
          ? '#8CBED6'
          : color >= 8
            ? '#FFDD99'
            : color >= 4
              ? '#5566AA'
              : '#332244'
    )
  }
  return [backgroundColor(hours[0]), backgroundColor(hours[parseInt(hours.length / 2)]), backgroundColor(hours[parseInt(hours.length - 1)])]
}
