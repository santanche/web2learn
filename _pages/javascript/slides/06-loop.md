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

# References

* Mozilla MDN - https://developer.mozilla.org

* Eloquent JavaScript - https://eloquentjavascript.net/

---

<!-- class: invert -->

## André Santanchè

www.ic.unicamp.br/~santanch/

## Web2Learn

santanche.github.io/web2learn/