import { useState } from 'react'

export default function MedicationItem() {
  const [medication, setMedication] = useState({
    name: 'Velocirest',
    description: 'Description of dosage and frequency of use of Velocirest.',
    image: '/src/assets/medication1.svg',
    dose: 200,
    unity: 'mg',
    quantity: 1,
    frequency: 'day'
    })

  const { name, description, image, dose, unity, quantity, frequency } = medication;

  return (
    <div style={{ width: '300px', background: 'lightgray' }}>
      <img src={image} width="50px" />
      <h1>{name}</h1>
      <p>{description}</p>
      <p><b>dose:</b> {dose} {unity}</p>
      <p><b>frequency:</b> {quantity} / {frequency}</p>
      <button type="button" onClick={() => setMedication({ ...medication, quantity: quantity + 1 })}>
        Increase quantity
      </button>
    </div>
  )
}