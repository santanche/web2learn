---
marp: true
theme: uncover
class: invert
permalink: /frameworks/react/slides/03-components/
---

Black & White Series

# React Components

#### Thinking in React

---

<!-- class: lead -->

# React

![width:150px](../../../../frameworks/react/slides/images/react-logo.svg)

* https://react.dev/

---

# React Component

Available at: [frameworks/react/4-component](https://github.com/santanche/web2learn/tree/master/frameworks/react/4-component)

---

#### HTML Specification
# Component Step 1

~~~html
<div style={{width: '300px', background: 'lightgray'}}>
  <img src={medication1} width="50px"/>
  <h1>Velocirest</h1>
  <p>Description of dosage and frequency of use of Velocirest.</p>
</div>
~~~

![width:300px](../../../../frameworks/react/slides/images/component-html.png)

---

#### HTML Specification
# Component Step 1

~~~javascript
export default function MedicationItem() {
  return <div style={{width: '300px', background: 'lightgray'}}>
           <img src={medication1} width="50px"/>
           <h1>Velocirest</h1>
           <p>Description of dosage and frequency of use of Velocirest.</p>
         </div>
}
~~~

![width:300px](../../../../frameworks/react/slides/images/component-html.png)

---

#### First React Program
# Importing Libraries from CDN

CDN - Content Delivery Network

~~~html
<script src="https://unpkg.com/react/umd/react.development.js">
</script>
<script src="https://unpkg.com/react-dom/umd/react-dom.development.js">
</script>
~~~

---

# First React Program - Script

~~~js
const root = ReactDOM.createRoot(
  document.getElementById('root')
)
~~~

![width:750px](../../../../frameworks/react/slides/images/root.svg)

---

# First React Program - Script

~~~js
root.render(
  React.createElement('h1', null, 'Velocirest')
)
~~~

![width:750px](../../../../frameworks/react/slides/images/render.svg)

---

# JSX

* Proposed by Facebook
  * https://facebook.github.io/jsx/
* XML constructs within JavaScript
* Requires the use of a Transpiler (preprocessor)

---

# React with JSX

Available at: [frameworks/react/2-basic-jsx](https://github.com/santanche/web2learn/tree/master/frameworks/react/2-basic-jsx)

---

![width:1000px](../../../../frameworks/react/slides/images/page-code-1.svg)

---

![width:1000px](../../../../frameworks/react/slides/images/page-code-2.svg)

---


![width:1000px](../../../../frameworks/react/slides/images/page-code-3.svg)

---

# React with JSX

~~~js
root.render(
  <h1>Velocirest</h1>
)
~~~

![width:750px](../../../../frameworks/react/slides/images/render-jsx.svg)

---

# JSX and Babel Transpiler

~~~html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<script  type="text/babel">
  ...
</script>
~~~

![width:1000px](../../../../frameworks/react/slides/images/render-transpiler.svg)

---

# Babel Transpiler

![width:750px](../../../../frameworks/react/slides/images/babel.svg)

---

# References

* [Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)

* [React createRoot](https://react.dev/reference/react-dom/client/createRoot)

* [React createElement](https://react.dev/reference/react/createElement)

* [Eloquent JavaScript](https://eloquentjavascript.net/)

---

<!-- class: invert -->

## André Santanchè

www.ic.unicamp.br/~santanch/

## Web2Learn

santanche.github.io/web2learn/