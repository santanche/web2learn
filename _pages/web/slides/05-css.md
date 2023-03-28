---
marp: true
theme: uncover
class: invert
permalink: /web/slides/05-css/
---

Black & White Series

# Separation Content-Style

### CSS - Cascading Style Sheet

---

<!-- class: lead -->

# CSS
### Cascading Style Sheets

* Styling language
* First release by W3C in 1996
* Describes presentation of HTML and XML documents

---

# Last Styling Example

~~~html
<html>
  <body>
    <h1 style="font-family:Arial">Dinosaur Story</h1>
    <p style="color:blue">
      The <b style="color:green">dinosaur jumped</b> into the mud.
    </p>
  </body>
</html>
~~~

---

# Separation Content-Style

![Separation Content-Style](../../../web/slides/images/separation-content-style.svg)


---

# HTML & CSS

![Separation Content-Style](../../../web/slides/images/separation-html-css.svg)

---

# `style` element - `head`

~~~html
<!DOCTYPE html>
<html>
  <head>
    <style>
      h1 {
        font-family: Arial;
      }
      p {
        color: blue;
      }
      b {
        color: green;
      }
    </style>
  </head>
  <body>
    <h1>Dinosaur Story</h1>
    <p>The <b>dinosaur jumped</b> into the mud.</p>
  </body>
</html>
~~~

---

# Styling Elements

Three strategies based on:

* element tags
* classes
* unique identifiers

---

# Styling Elements by Tag

* Styles all elements with the same tag

~~~html
<style>
  h1 {
    font-family: Arial;
  }
  p {
    color: blue;
  }
</style>
...
<p>Author: Asdrubal</p>
<h1>Dinosaur Story</h1>
<p>The dinosaur jumped into the mud.</p>
~~~

---

# Styling Elements by Tag

![Separation Content-Style](../../../web/slides/images/style-tag.png)

---

# Styling Elements by Class

* Styles all elements with the same class
  * a class is prefixed by a dot

~~~html
<style>
  .story {
    color: blue;
  }
</style>
...
<p>Author: Asdrubal</p>
<h1 class="story">Dinosaur Story</h1>
<p class="story">The dinosaur jumped into the mud.</p>
~~~

---

# Styling Elements by Class

![Separation Content-Style](../../../web/slides/images/style-class.png)

---

# Styling Elements by Id

* Styles an element identified by an id
  * the id attribute value is unique

~~~html
<style>
  #author {
    color: blue;
  }
</style>
...
<p id="author">Author: Asdrubal</p>
<h1>Dinosaur Story</h1>
<p>The dinosaur jumped into the mud.</p>
~~~

---

# Styling Elements by Id

![Separation Content-Style](../../../web/slides/images/style-id.png)

---

# External CSS File

![Separation Content-Style](../../../web/slides/images/external-css.svg)

---

# Central CSS for Pages

![Separation Content-Style](../../../web/slides/images/central-css.svg)

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