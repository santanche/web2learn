---
marp: true
theme: uncover
class: invert
permalink: /javascript/slides/02-literals/
---

Black & White Series

# JavaScript Literals

#### JavaScript for C or Java Programmers

---

<!-- class: lead -->

# Atomic Literals

| type | typical values | |
|---|---|---|
| boolean | true | false |
| number  | 15 | 7.82 |

---

# Strings

Basic string - two interchangeable options:
~~~js
'basic string'
"basic string"
~~~

One can use one inside the other:
~~~js
console.log('The dinosaur "jumped into the mud"')
~~~

Output:
~~~
The dinosaur "jumped into the mud"
~~~

---

# Multiline String

~~~js
`line 1
line 2
...`
~~~

Example:
~~~js
console.log(`The dinosaur
jumped into the mud`)
~~~

Output:
~~~
The dinosaur
jumped into the mud
~~~

---

# Not a Number (NaN)

A usual output for wrong expressions.
~~~js
console.log(8 - 'x')
~~~

Output:
~~~
NaN
~~~