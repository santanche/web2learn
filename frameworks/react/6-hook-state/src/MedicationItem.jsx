import { useState } from 'react'

export default function MedicationItem() {
  const [image, setImage] = useState('/src/assets/medication1.svg')

  return <div style={{width: '300px', background: 'lightgray'}}>
           <img src={image} width="50px"/>
           <h1>Velocirest</h1>
           <p>Description of dosage and frequency of use of Velocirest.</p>
           <button type="button"
                   onClick={() => setImage("/src/assets/medication2.svg")}>
             Capsule
           </button>
         </div>
}