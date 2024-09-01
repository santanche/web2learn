export const userModel = {
  name: '',
  email_id: '',
  birthday: ''
}

let userSet = []
let userPosition = 0

export async function fetchUsers() {
  const response = await fetch("http://localhost:8000/users")
  userSet = await response.json()
}

export function userReducer(user, action) {
  let newUser = user

  switch (action.type) {
    case 'first_user':
      userPosition = 0
      break 
    case 'next_user':
      if (userPosition < userSet.length - 1)
        userPosition++
      break
  }

  if (userPosition < userSet.length)
    newUser = userSet[userPosition]

  return newUser
}

