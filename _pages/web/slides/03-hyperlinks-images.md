---
marp: true
theme: uncover
class: invert
permalink: /web/slides/03-hyperlinks-images/
---

Black & White Series

# References

#### Hyperlinks and Images

---

<!-- class: lead -->

# Anatomy of an Element

![Anatomy of an Element](../../../web/slides/images/element-anatomy.svg)

--

Based on [MDN Glossary](https://developer.mozilla.org/en-US/docs/Glossary/Element)

---

# Attributes

* Defined inside the opening tag:

~~~html
<tag attr1="value1" attr2="value2">
~~~

* Element
  * can have several attributes
  * with no repeated names


* Example:

~~~html
<p id="dino" class="story">
  The dinosaur jumped into the mud.
</p>
~~~

---

# Hyperlink

* Links this document to other Web resources
  * basis of hypertext and web notions
  * web of documents and resources linked

![Web](../../../web/slides/images/web.svg)

---

# Hyperlink Anatomy

![Hyperlink Anatomy](../../../web/slides/images/hyperlink-anatomy.svg)

---

# Void Element

* Does not delimit a content
* Has no closing tag

Examples:

* `<img>` - inserts an external image in the element place
* `<br>` - skips to the next line

---

# Image Anatomy

![Image Anatomy](../../../web/slides/images/image-anatomy.svg)

---

# Absolute x Relative

~~~html
<h1>Relative</h1>
<img src="images/dino.svg" alt="A terrible dinosaur">
<h1>Absolute</h1>
<h2><a href="https://xkcd.com/1452/">Jurassic World</a></h2>
<img src="https://imgs.xkcd.com/comics/jurassic_world.png" alt="A terrible dinosaur">
~~~

---

# Absolute x Relative

![Absolute x Relative](../../../web/slides/images/absolute-relative.svg)

---

<!-- class: invert -->

## André Santanchè

www.ic.unicamp.br/~santanch/

## Web2Learn

santanche.github.io/web2learn/