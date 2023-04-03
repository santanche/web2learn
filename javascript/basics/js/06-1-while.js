let week = 0
const limit = Math.trunc(Math.random() * 8)
console.log('limit: ' + limit)
while (week < limit) {
  week++
  console.log('weekday: ' + week)
}
