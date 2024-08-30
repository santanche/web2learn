export const medicationModel = {
  name: 'Velocirest',
  description: 'Description of dosage and frequency of use of Velocirest.',
  image: '/src/assets/medication1.svg',
  dose: 200,
  unity: 'mg',
  quantity: 1,
  frequency: 'day',
  weeklyDose: calculateWeekly(200, 1, 'day')
}

function calculateWeekly(dose, quantity, frequency) {
  const frequencyTimes = {
    '8 hours': 21,
    'day': 7,
    'week': 1
  }

  return dose * quantity * frequencyTimes[frequency]
}

export function medicationReducer(medication, action) {
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

