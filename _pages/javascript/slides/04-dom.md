---
marp: true
theme: uncover
class: invert
permalink: /javascript/slides/04-dom/
---

Black & White Series

# DOM

#### Document Object Model

---

<!-- class: lead -->

# Web Layers

![width:1000px](../../../javascript/slides/images/html-css-presentation.svg)

---

# DOM Tree

![width:1100px](../../../javascript/slides/images/html-dom.svg)

---

# JavaScript DOM View

![width:1200px](../../../javascript/slides/images/javascript-dom-page.svg)

---

# Defining a `span` Target

![span target](../../../javascript/slides/images/dom-span-01.svg)

---

# Importing an External JS

![External JS](../../../javascript/slides/images/dom-span-02.svg)

---

# Retrieving the `span` Object

![querySelector](../../../javascript/slides/images/dom-span-03.svg)

---

# Inserting HTML content

![innerHTML](../../../javascript/slides/images/dom-span-04.svg)

---

# CSS Selectors

| selector   | syntax       | examples   |
|------------|--------------|------------|
| type       | tag name     | `p`, `h1`  |
| classe     | `.classname` | `.story`   |
| identifier | `#idname`    | `#show-wd` |

**Reference:** [mdn CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

---

# `document.querySelector`

~~~js
querySelector(<selector>)
~~~

* Returns the first element within the document that matches the selector
* This element is a DOM object

**Reference:** [mdn Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

---

# `Element.innerHTML`

* JavaScript **property**
* Gets or Sets the HTML inside an element

---

# `div` Example

![div Example](../../../javascript/slides/images/dom-div-01.svg)

---

# More Complex `innerHTML`

![Complex innerHTML](../../../javascript/slides/images/dom-div-02.svg)

---

<!-- class: invert -->

## André Santanchè

www.ic.unicamp.br/~santanch/

## Web2Learn

santanche.github.io/web2learn/