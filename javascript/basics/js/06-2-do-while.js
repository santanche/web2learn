let week = 0
const limit = Math.trunc(Math.random() * 8)
console.log('limit: ' + limit)
do {
  week++
  console.log('weekday: ' + week)
} while (week < limit)
