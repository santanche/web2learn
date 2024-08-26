import { createContext, useState } from 'react'
import MedicationItem from './MedicationItem.jsx'

export const MedicationContext = createContext()

export default function MedicationChange() {
  const [image, setImage] = useState('/src/assets/medication1.svg')

  return <MedicationContext.Provider value={image}>
           <MedicationItem name="Velocirest"
                           description="Description of dosage and frequency of use of Velocirest." />
           <button type="button"
                   onClick={() => setImage("/src/assets/medication2.svg")}>
             Capsule
           </button>
         </MedicationContext.Provider>
}