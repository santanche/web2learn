import medication1 from './assets/medication1.svg'

export default function MedicationItem() {
  return <div style={{width: '300px', background: 'lightgray'}}>
           <img src={medication1} width="50px"/>
           <h1>Velocirest</h1>
           <p>Description of dosage and frequency of use of Velocirest.</p>
         </div>
}