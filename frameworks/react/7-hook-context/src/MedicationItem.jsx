import { useContext } from 'react'
import { MedicationContext } from './MedicationChange.jsx'

export default function MedicationItem({ name, description }) {
  const image = useContext(MedicationContext)

  return <div style={{width: '300px', background: 'lightgray'}}>
           <img src={image} width="50px"/>
           <h1>{name}</h1>
           <p>{description}</p>
         </div>
}