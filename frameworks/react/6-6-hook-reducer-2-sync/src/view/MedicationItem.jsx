import { useContext } from 'react'
import { MedicationContext } from './MedicationPanel.jsx'

export default function MedicationItem() {

  const [medication, medicationDispatch] = useContext(MedicationContext)

  const { name, description, image, dose, unity, quantity, frequency } = medication

  return (
    <div style={{ width: '300px', background: 'lightgray' }}>
      <img src={image} width="50px" />
      <h1>{name}</h1>
      <p>{description}</p>
      <p><b>dose:</b> {dose} {unity}</p>
      <p><b>frequency:</b> {quantity} / {frequency}</p>
      <button type="button" onClick={() => medicationDispatch({ type: 'increase_quantity' })}>
        Increase quantity
      </button>
      <br />
      <button type="button" onClick={() => medicationDispatch({ type: 'decrease_quantity' })}>
        Decrease quantity
      </button>
    </div>
  )
}