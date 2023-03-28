---
marp: true
theme: uncover
class: invert
permalink: /web/slides/02-tree/
---

Black & White Series

# HTML Tree

#### Structure and Format

---

<!-- class: lead -->

# Minimal HTML Page

~~~html
<!DOCTYPE html>
<html>
  <body>
    The <b>dinosaur jumped</b> into the mud.
  </body>
</html>
~~~

---

# HTML Markup and Tree

![HTML Markup](../../../web/slides/images/page-markup-d.svg)

---

# Element

* Tags delimit Elements:
  * element name = tag;
  * element content = everything delimited by the tag.


---


# `html` Element

![html element](../../../web/slides/images/element-html.svg)

---

# `body` Element

![body element](../../../web/slides/images/element-body.svg)

---

# `b` Element

![b element](../../../web/slides/images/element-b.svg)

---

# Header Element `<h_>`

* Document headers in levels

~~~html
<h1>Level 1</h1>
<h2>Level 2</h2>
<h3>Level 3</h3>
~~~

![Header Levels](../../../web/slides/images/header-levels.png)

---

# Paragraph Element `<p>`

* Document headers in levels

~~~html
<p>paragraph 1</p>
<p>paragraph 2</p>
~~~

paragraph 1

paragraph 2

---

# Header and Paragraph Example

~~~html
<!DOCTYPE html>
<html>
  <body>
    <h1>Dinosaur Story</h1>
    <p>The <b>dinosaur jumped</b> into the mud.</p>
  </body>
</html>
~~~

---

# Document Body Tree

![Document Body Tree](../../../web/slides/images/body-dom-tree.svg)

---

# Head `<head>`

* Metadata block of the document
  * not displayed on the page

~~~html
<!DOCTYPE html>
<html>
  <head>
    <title>Dinosaur and Mud</title>
  </head>
  <body>
    <h1>Dinosaur Story</h1>
    <p>The <b>dinosaur jumped</b> into the mud.</p>
  </body>
</html>
~~~

---

# Document Tree

![Document Tree](../../../web/slides/images/document-dom-tree.svg)

---

# Videos / Tutorials

### W3Schools HTML Tutorial
https://www.w3schools.com/html/

### Web and Semantic Web 2015 Playlist
https://youtube.com/playlist?list=PL3JRjVnXiTBZpnuD7ZtJ3fdNsCcR5Oy7B

---

<!-- class: invert -->

## André Santanchè

www.ic.unicamp.br/~santanch/

## Web2Learn

santanche.github.io/web2learn/