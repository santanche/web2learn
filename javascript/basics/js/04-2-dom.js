const daysOfWeek =
  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const day = Math.trunc(Math.random() * 7)

const divObj = document.querySelector("#show-wd")
divObj.innerHTML = `<h1>Today is ${daysOfWeek[day]}</h1>`