import ReactDOM from 'react-dom/client'
import MedicationPanel from './view/MedicationPanel.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <div style={{ display: 'flex' }}>
    <MedicationPanel />
  </div>
)