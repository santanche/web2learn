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

![Resulting Component](../../../../frameworks/react/slides/images/component-html.png)

---

# Component Predefined

~~~javascript
export default function MedicationItem() {
  return <div style={{width: '300px', background: 'lightgray'}}>
           <img src={medication1} width="50px"/>
           <h1>Velocirest</h1>
           <p>Description of dosage and frequency of use of Velocirest.</p>
         </div>
}
~~~

![Resulting Component](../../../../frameworks/react/slides/images/component-html.png)

---

# MedicationItem Design

![Component Structure](../../../../frameworks/react/slides/images/component-diagram-1.svg)

---

## MedicationItem React

![width:300px](../../../../frameworks/react/slides/images/component-uml-2.svg)

![width:800px](../../../../frameworks/react/slides/images/component-diagram-2.svg)

---

# Component Hierarchy

Available at: [frameworks/react/5-hierarchy](https://github.com/santanche/web2learn/tree/master/frameworks/react/5-hierarchy)

---

## MedicationItem with Properties

![width:300px](../../../../frameworks/react/slides/images/component-uml-3.svg)

![width:800px](../../../../frameworks/react/slides/images/component-diagram-2.svg)

---

# Component with Properties

~~~javascript
export default function MedicationItem({ name, description, image }) {
  return <div style={{width: '300px', background: 'lightgray'}}>
           <img src={image} width="50px"/>
           <h1>{name}</h1>
           <p>{description}</p>
         </div>
}
~~~

---

# MedicationList Design

![width:1000px](../../../../frameworks/react/slides/images/component-diagram-3.svg)

---

# Aggregating Components

~~~javascript
export default function MedicationList() {
  return <>
           <MedicationItem name="Velocirest"
                           description="Description of dosage and frequency of use of Velocirest."
                           image="/src/assets/medication1.svg" />
           <MedicationItem name="Tricerabust"
                           description="Description of dosage and frequency of use of Tricerabust."
                           image="/src/assets/medication2.svg" />
           <MedicationItem name="Tyrannotonic"
                           description="Description of dosage and frequency of use of Tyrannotonic."
                           image="/src/assets/medication3.svg" />
         </>
}
~~~

---

# Tarefa

* Baseado no design desenvolvido na tarefa do Figma, crie um componente que crie um componente com que represente a ficha completa do paciente com os medicamentos que ele toma:

![width:200px](../../../../frameworks/react/slides/images/hierarchy-task-1.svg)

---

# Tarefa

![width:800px](../../../../frameworks/react/slides/images/hierarchy-task-2.svg)

---


<!-- class: invert -->

## André Santanchè

www.ic.unicamp.br/~santanch/

## Web2Learn

santanche.github.io/web2learn/