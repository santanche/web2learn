import ReactDOM from 'react-dom/client'
import MedicationItem from './view/MedicationItem.jsx'
import MedicationTrack from './view/MedicationTrack.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <div style={{ display: 'flex' }}>
    <MedicationItem />
    <MedicationTrack />
  </div>
)