---
marp: true
theme: uncover
class: invert
permalink: /web/slides/06-generic-elements/
---

Black & White Series

# Generic Elements

### `<span>` and `<div>`

---

<!-- class: lead -->

# `<span>` and `<div>`

* `<span>` - generic inline element
* `<div>` - generic element for flow content
  * everything not inline

---

# External CSS File

![Separation Content-Style](../../../web/slides/images/external-css.svg)

---

# Styling Inline with `<span>`

`general-style.css`

~~~css
#author { color: blue; }
~~~

HTML

~~~html
<p>Author: Asdrubal</p>
~~~

![SPAN Pre-Style](../../../web/slides/images/span-pre-style.png)

---

# Styling Inline with `<span>`

### `general-style.css`
~~~css
#author { color: blue; }
~~~

### HTML
~~~html
<p>Author: <span id="author">Asdrubal</span></p>
~~~

![SPAN Styled](../../../web/slides/images/span-styled.png)

---

# Styling Block with `<div>`

`general-style.css`

~~~css
.story { color: gray; }
~~~

HTML

~~~html
<h1>Dinosaur Story</h1>
<p>The <span class="emphasis">dinosaur jumped</span> into the mud.</p>
~~~

![DIV Pre-Style](../../../web/slides/images/div-pre-style.png)

---

# Styling Block with `<div>`

`general-style.css`

~~~css
.story { color: gray; }
~~~

HTML

~~~html
<div class="story">
  <h1>Dinosaur Story</h1>
  <p>The <span class="emphasis">dinosaur jumped</span> into the mud.</p>
</div>
~~~

![DIV Styled](../../../web/slides/images/div-styled.png)

---

# Replacing Specialized Formats

* Replacing tags specialized in a format, like `<b>` (bold) and `<i>` (italic):

~~~css
.emphasis { font-weight: bold; }
~~~

HTML

~~~html
<p>The <span class="emphasis">dinosaur jumped</span> into the mud.</p>
~~~

---

<!-- class: invert -->

## André Santanchè

www.ic.unicamp.br/~santanch/

## Web2Learn

santanche.github.io/web2learn/