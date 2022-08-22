export function getMonthName(date) {
  date = new Date(date)
  let monthEn = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Avg',
    'Sep',
    'Okt',
    'Nov',
    'Dec',
  ]
  return monthEn[date.getMonth()]
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0')
}

export function formatDateTime(date) {
  date = new Date(date)
  return (
    [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/') +
    ' ' +
    [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(':')
  )
}
