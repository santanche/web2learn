---
marp: true
theme: uncover
class: invert
permalink: /javascript/slides/01-environment/
---

Black & White Series

# JavaScript Environment

#### JavaScript for C or Java Programmers

---

<!-- class: lead -->

# JavaScript

* Invented by Brendan Eich at Netscape
* ECMAScript -> standardization (ECMA, 2011)
* Originally for small in-browser scripts
* Local hardware access limitations
  * security
  * platform independence

---

# Experimental environment

### Javascript Playground (https://playcode.io/)
interactive environment ideal for starters

---

# Inspection Output

~~~js
console.log(<string>)
~~~

* A simple form of producing outputs for:
  * inspection
  * learning
* Not presented on the page
  * unfit for application output

~~~js
console.log('The dinosaur jumped into the mud')
~~~

---

# Sequence of Instructions

* One instruction per line
  * a semicolon, in the end, is optional

~~~js
console.log('=== Dinosaur Story ===')
console.log('The dinosaur jumped into the mud')
~~~

* Several instructions in the same line
  * separated by semicolons (mandatory)

~~~js
console.log('=== Dinosaur Story ==='); console.log('The dinosaur jumped into the mud');
~~~

---

# Inserting in a Page
### Non-usual form

~~~html
<!DOCTYPE html>
<html>
  <body>
    JavaScript learning - look at the console.
    <script>
      console.log('=== Dinosaur Story ===')
      console.log('The dinosaur jumped into the mud')
    </script>
  </body>
</html>
~~~

---

# References

* Mozilla MDN - https://developer.mozilla.org

* Eloquent JavaScript - https://eloquentjavascript.net/

![Eloquent JavaScript](../../../javascript/slides/images/eloquent-javascript.png)

---

<!-- class: invert -->

## André Santanchè

www.ic.unicamp.br/~santanch/

## Web2Learn

santanche.github.io/web2learn/