import { useContext } from 'react'
import { MedicationContext } from './MedicationPanel.jsx'

export default function MedicationTrack() {

  const [medication, medicationDispatch] = useContext(MedicationContext)

  const { name, unity, weeklyDose } = medication

  return (
    <div style={{ width: '300px', border: '1px solid darkgray', textAlign: 'center' }}>
      <h1>Medication Track</h1>
      <h2>{name}</h2>
      <p><b>weekly dose:</b> {weeklyDose} {unity}</p>
    </div>
  )
}