import { useReducer } from 'react'

function calculateWeekly(dose, quantity, frequency) {
  const frequencyTimes = {
    '8 hours': 21,
    'day': 7,
    'week': 1
  }

  return dose * quantity * frequencyTimes[frequency]
}

function medicationReducer(medication, action) {
  const { dose, quantity, frequency } = medication

  let newQuantity = quantity
  
  switch (action.type) {
    case 'increase_quantity': newQuantity++; break
    case 'decrease_quantity': newQuantity--; break
  }

  return { ...medication,
           quantity: newQuantity,
           weeklyDose: calculateWeekly(dose, newQuantity, frequency) }
}

export default function MedicationItem() {
  const [medication, medicationDispatch] = useReducer(medicationReducer, {
    name: 'Velocirest',
    description: 'Description of dosage and frequency of use of Velocirest.',
    image: '/src/assets/medication1.svg',
    dose: 200,
    unity: 'mg',
    quantity: 1,
    frequency: 'day',
    weeklyDose: calculateWeekly(200, 1, 'day')
    })

  const { name, description, image, dose, unity, quantity, frequency, weeklyDose } = medication

  return (
    <div style={{ width: '300px', background: 'lightgray' }}>
      <img src={image} width="50px" />
      <h1>{name}</h1>
      <p>{description}</p>
      <p><b>dose:</b> {dose} {unity}</p>
      <p><b>frequency:</b> {quantity} / {frequency}</p>
      <p><b>weekly dose:</b> {weeklyDose} {unity}</p>
      <button type="button" onClick={() => medicationDispatch({ type: 'increase_quantity' })}>
        Increase quantity
      </button>
      <br />
      <button type="button" onClick={() => medicationDispatch({ type: 'decrease_quantity' })}>
        Decrease quantity
      </button>
    </div>
  );
}