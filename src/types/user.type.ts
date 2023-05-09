type Roles = 'User' | 'Admin'

export interface User {
  roles: Roles[]
  _id: string
  email: string
  createdAt: string
  updatedAt: string
}
