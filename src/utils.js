import Moment from 'moment'

export const toHour = number => number % 24

export const durationFromNow = (hours, column, row, timeSeed) => {
  const until = Moment(timeSeed).startOf('date').add(column, 'days').add(hours[row], 'hours').unix()
  const now = Moment().unix()
  return (Moment.duration((until - now) * 1000).asHours())
}

export const slotify = (hours, column, row, timeSeed) => {
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

export const colorPicker = (hours, colors, svgLength, gap) => {
  console.log("_____________BEGIN_______________")
  const dayDivide = 24
  const divider = dayDivide / colors.length
  const hoursRange = hours[hours.length - 1] + gap - hours[0]
  const dayHours = Array.apply(null, Array(dayDivide)).map((_, i) => colors[parseInt(i / divider)])
  console.log(dayHours)
  const res = Array.apply(null, Array(svgLength)).map((_, i) => {
    console.log(parseInt(hoursRange * i / svgLength) + hours[0])
    return dayHours[parseInt(hoursRange * i / svgLength) + hours[0]]
  })
  console.log(res)
  console.log("_____________END_______________")
  return res
}
