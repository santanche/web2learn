const week = Math.trunc(Math.random() * 7) + 1, wd = ''
switch (week) {
  case 1: wd = 'Sunday';  break;
  case 2: wd = 'Monday';  break;
  case 3: wd = 'Tuesday';  break;
  case 4: wd = 'Wednesday';  break;
  case 5: wd = 'Thursday';  break;
  case 6: wd = 'Friday';  break;
  case 7: wd = 'Saturday';  break;
  default: wd = 'Invalid day'
}
console.log('Weekday: ' + week + ' - ' + wd)