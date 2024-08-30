import { useReducer } from 'react'
import { medicationModel, medicationReducer } from '../redux/MedicationRedux'

export default function MedicationTrack() {

  const [medication, medicationDispatch] = useReducer(medicationReducer, medicationModel)

  const { name, unity, weeklyDose } = medication

  return (
    <div style={{ width: '300px', border: '1px solid darkgray', textAlign: 'center' }}>
      <h1>Medication Track</h1>
      <h2>{name}</h2>
      <p><b>weekly dose:</b> {weeklyDose} {unity}</p>
    </div>
  )
}