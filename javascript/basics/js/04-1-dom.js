const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const day = Math.trunc(Math.random() * 7)

const spanObj = document.querySelector("#show-wd")
spanObj.innerHTML = daysOfWeek[day]