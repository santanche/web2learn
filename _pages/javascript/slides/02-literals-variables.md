---
marp: true
theme: uncover
class: invert
permalink: /javascript/slides/02-literals-variables/
---

Black & White Series

# Literals, Variables, and Constants

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

# Automatic/Manual Conversions

~~~js
console.log('2' + 3)
console.log(parseInt('2') + 3)
console.log('2' * 3)
console.log('x' - 3)
~~~

---

# Automatic/Manual Conversions

~~~js
console.log('2' + 3)
console.log(parseInt('2') + 3)
console.log('2' * 3)
console.log('x' - 3)
~~~

~~~
23
5
6
nan
~~~

* `NaN` - usual output for wrong expressions

---

# Variable/Constant Declaration

~~~javascript
<let/const/var> <name1> = <init1>,..., <namen> = <initn>
~~~

* `let` - a variable in a scope
  * equivalent behavior to C variables
* `const` - a constant in a scope
* `var` - old fashion variable declaration
  * rules for scope different from `let`
  * not recommended in general
---

# Example

~~~javascript
let price = 20, fees = 5
const pi = 3.1416

price += fee // right
pi = 3.14 // error
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