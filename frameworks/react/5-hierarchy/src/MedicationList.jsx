import MedicationItem from './MedicationItem.jsx'

export default function MedicationList() {
  return <div>
           <MedicationItem name="Velocirest"
                           description="Description of dosage and frequency of use of Velocirest."
                           image="/src/assets/medication1.svg" />
           <MedicationItem name="Tricerabust"
                           description="Description of dosage and frequency of use of Tricerabust."
                           image="/src/assets/medication2.svg" />
           <MedicationItem name="Tyrannotonic"
                           description="Description of dosage and frequency of use of Tyrannotonic."
                           image="/src/assets/medication3.svg" />
         </div>
}