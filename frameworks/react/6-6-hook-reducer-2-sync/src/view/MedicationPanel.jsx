import { useReducer, createContext } from 'react'
import { medicationModel, medicationReducer } from '../redux/MedicationRedux'
import MedicationItem from './MedicationItem.jsx'
import MedicationTrack from './MedicationTrack.jsx'

export const MedicationContext = createContext()

export default function MedicationPanel() {
  const [medication, medicationDispatch] = useReducer(medicationReducer, medicationModel)

  return (
    <MedicationContext.Provider value={[medication, medicationDispatch]}>
      <div style={{ display: 'flex' }}>
        <MedicationItem />
        <MedicationTrack />
      </div>
    </MedicationContext.Provider>
  )
}