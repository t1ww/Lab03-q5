export interface Event {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petsAllowed: boolean
  organizer: string
}
export interface Student {
  id: number
  studentId: string
  name: string
  gpa: number
  image: string
  description: string
}
export interface Passenger {
  id: number
  first_name: string
  last_name: string
  email: string
  gender: string
  ip_address: string
  source: string
  destination: string
  travelDate: Date
  airlineId: number
}