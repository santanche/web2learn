---
marp: true
theme: uncover
class: invert
permalink: /javascript/slides/05-conditional/
---

Black & White Series

# Conditional

#### JavaScript for C or Java Programmers

---

<!-- class: lead -->

# `if` structure

~~~javascript
if (<condition>)     if (<condition>)
  <block>              <block>
                     else
                       <block>
~~~

* `<condition>`
  * parenthesis are mandatory
* `<block>`
  * only one instruction
  * more than one instruction
    * delimited by braces { }

---

# Example 1

~~~javascript
const x = Math.random()
console.log(x)
if (x < 0.5)
  console.log('heads')
else
  console.log('tails')
~~~

Console:
~~~
coin: 0.8337865947265267
tails
~~~

---

# Example 2

~~~javascript
const coin1 = Math.random(),
      coin2 = Math.random()
console.log('coin 1: ' + coin1)
console.log('coin 2: ' + coin2)
if (coin1 < 0.5 && coin2 < 0.5) {
  console.log('heads and heads')
  console.log('you win')
}
~~~

Console:
~~~
coin 1: 0.08818858388745576
coin 2: 0.482715182514171
heads and heads
you win
~~~

---

# `switch` structure

~~~javascript
switch ( <expression> )
{
  case <value1> : <instructions>
                  break;
  ...
  case <valuen> : <instructions>
                  break;
  default : <instructions>
}
~~~

* Jumps to the "case" whose `<constant>` is equal to the value of `<expression>`
* Otherwise jump to `default`

---

# Example

~~~javascript
const day = Math.trunc(Math.random() * 7) + 1
let wd = ''
switch (day) {
  case 1: wd = 'Sunday';  break;
  case 2: wd = 'Monday';  break;
  case 3: wd = 'Tuesday';  break;
  case 4: wd = 'Wednesday';  break;
  case 5: wd = 'Thursday';  break;
  case 6: wd = 'Friday';  break;
  case 7: wd = 'Saturday';  break;
  default: wd = 'Invalid day'
}
console.log('weekday: ' + day + ' - ' + wd)
~~~

~~~
Weekday: 5 - Thursday
~~~

---

# Inline Conditional

~~~javascript
<condition> ? <value_true> : <value_false>
~~~

* Evaluates `<condition>`:
  * if `true`, returns `<value_true>`
  * if `false`, returns `<value_false>`

~~~javascript
const coin = (Math.random() < 0.5) ? 'heads' : 'tails'
console.log('coin: ' + coin)
~~~

~~~
coin: tails
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