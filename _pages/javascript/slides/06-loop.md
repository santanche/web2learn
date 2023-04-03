---
marp: true
theme: uncover
class: invert
permalink: /javascript/slides/06-loop/
---

Black & White Series

# Loop

#### JavaScript for C or Java Programmers

---

<!-- class: lead -->

# `while` Loop

~~~javascript
while (<condition>)
  <block>
~~~

Tests `<condition>` in the cycle beginning

~~~javascript
do
  <block>
while (<condition>)
~~~

Tests `<condition>` in the cycle ending

---

# Example 1

~~~javascript
let week = 0
const limit = Math.trunc(Math.random() * 8)
console.log('limit: ' + limit)
while (week < limit) {
  week++
  console.log('weekday: ' + week)
} 
~~~

~~~
limit: 0
~~~

~~~
limit: 2
weekday: 1
weekday: 2
~~~

---

# Example 2

~~~javascript
let week = 0
const limit = Math.trunc(Math.random() * 8)
console.log('limit: ' + limit)
do {
  week++
  console.log('weekday: ' + week)
} while (week < limit)
~~~

~~~
limit: 0
weekday: 1
~~~

~~~
limit: 2
weekday: 1
weekday: 2
~~~

---

# `for` Loop

~~~javascript
for (<initialization>; <condition>; <increment>)
  <block>
~~~

* `<initialization>`
  * executed before entering
  * usually initializes a control variable
* `<condition>`
  * tested on entry and every complete cycle
* `<increment>`
  * executed every complete cycle
  * usually increments the control variable

---

# Example

~~~javascript
const limit = Math.trunc(Math.random() * 8)
console.log('limit: ' + limit)
for (let day = 1; day <= limit; day++)
  console.log('weekday: ' + day)
~~~

~~~
limit: 0
~~~

~~~
limit: 2
weekday: 1
weekday: 2
~~~

---

# `for...in` Loop

~~~javascript
for (<variable> in <enumerable>)
  <block>
~~~

* Iterates for all elements of an `<enumerable>`
  * all items of an array
  * all fields of an object
* `<variable>` receives each enumeration value
  * index of an array
  * field of an object


---

# Example 1

~~~javascript
const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
for (const day in daysOfWeek)
  console.log(`weekday: ${day} - ${daysOfWeek[day]}`)
~~~

~~~
weekday: 0 - Mon
weekday: 1 - Tue
weekday: 2 - Wed
weekday: 3 - Thu
weekday: 4 - Fri
weekday: 5 - Sat
weekday: 6 - Sun
~~~

---

# Example 2

~~~javascript
const author = {
  'First Name': 'Asdrubal',
  'Last Name': 'Montequio',
  'Age': 25
}
for (const a in author)
  console.log(`${a} - ${author[a]}`)
~~~

~~~
First Name - Asdrubal
Last Name - Montequio
Age - 25
~~~

---

# `for...of` Loop

~~~javascript
for (<variable> of <iterable>)
  <block>
~~~

* Iterates for all elements of an `<iterable>`
  * all items of an array
* `<variable>` receives each element
  * element of an array (not its index)
* Objects are not iterable


---

# Example

~~~javascript
const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
for (const dw of daysOfWeek)
  console.log(`weekday: ${dw}`)
~~~

~~~
weekday: Mon
weekday: Tue
weekday: Wed
weekday: Thu
weekday: Fri
weekday: Sat
weekday: Sun
~~~

---

# Comparing

~~~javascript
const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
for (const day in daysOfWeek)
  console.log(`weekday: ${day} - ${daysOfWeek[day]}`)
~~~

~~~javascript
const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
for (const dw of daysOfWeek)
  console.log(`weekday: ${dw}`)
~~~

---

# References

* Mozilla MDN - https://developer.mozilla.org

* Eloquent JavaScript - https://eloquentjavascript.net/

---

<!-- class: invert -->

## André Santanchè

www.ic.unicamp.br/~santanch/

## Web2Learn

santanche.github.io/web2learn/