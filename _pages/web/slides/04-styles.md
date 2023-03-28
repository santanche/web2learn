---
marp: true
theme: uncover
class: invert
permalink: /web/slides/04-styles/
---

Black & White Series

# Page Styles

---

<!-- class: lead -->

# `style` Attribute

* Defines the presentation styles of an element

* Examples of styles:
  * color
  * letter font
  * letter size
  * background color

---

# Example

~~~html
<h1>Dinosaur Story</h1>
<p>
  The <b>dinosaur jumped</b> into the mud.
</p>
~~~

![Page without styles](../../../web/slides/images/page-without-styles.png)

---

# Example

~~~html
<h1 style="font-family:Arial">Dinosaur Story</h1>
<p style="color:blue">
  The <b>dinosaur jumped</b> into the mud.
</p>
~~~

![Page with styles](../../../web/slides/images/page-with-styles.png)

---

# Style Scope

The style reaches the element scope

![Styles Scope](../../../web/slides/images/style-scope.svg)

---

# Style Scope Hierarchy

Inner scopes replace outer ones

~~~html
<p style="color:blue">
  The <b style="color:green">dinosaur jumped</b> into the mud.
</p>
~~~

![Inner and Outer Scopes](../../../web/slides/images/inner-outer-scopes.png)

---

# Videos / Tutorials

### W3Schools HTML Tutorial
https://www.w3schools.com/html/

### Web and Semantic Web 2015 Playlist
https://youtube.com/playlist?list=PL3JRjVnXiTBZpnuD7ZtJ3fdNsCcR5Oy7B
