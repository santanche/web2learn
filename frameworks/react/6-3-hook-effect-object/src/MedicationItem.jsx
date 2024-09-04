import { useState, useEffect } from 'react'

function incrementMedication(medication, setMedication) {
  setMedication({...medication, quantity: medication.quantity + 1})
}

function calculateWeekly(dose, quantity, frequency) {
  const frequencyTimes = {
    '8 hours': 21,
    'day': 7,
    'week': 1
  }

  return dose * quantity * frequencyTimes[frequency]
}

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
  const [weeklyDose, setWeeklyDose] = useState(0)

  useEffect(() => {
    setWeeklyDose(calculateWeekly(medication.dose, medication.quantity, medication.frequency))
  }, [medication])

  const { name, description, image, dose, unity, quantity, frequency } = medication

  return (
    <div style={{ width: '300px', background: 'lightgray' }}>
      <img src={image} width="50px" />
      <h1>{name}</h1>
      <p>{description}</p>
      <p><b>dose:</b> {dose} {unity}</p>
      <p><b>frequency:</b> {quantity} / {frequency}</p>
      <p><b>weekly dose:</b> {weeklyDose} {unity}</p>
      <button type="button" onClick={() => incrementMedication(medication, setMedication)}>
        Increase quantity
      </button>
    </div>
  )
}