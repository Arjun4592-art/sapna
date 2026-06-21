export interface UserDoc {
  uid: string
  name: string
  email: string
  phone: string
  role: 'admin' | 'student'
  enrolledPrograms: string[]
  createdAt: any
}

export interface Program {
  id: string
  title: string
  subtitle: string
  weeks: number
  price: number
  originalPrice: number
  description: string
  includes: string[]
  modules: Module[]
}

export interface Module {
  id: string
  programId: string
  weekNum: number
  title: string
  description: string
  locked: boolean
  content?: string
}

export interface Session {
  id: string
  userId: string
  programId: string
  weekNum: number
  title: string
  date: any
  zoomLink: string
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
}

export interface Enrollment {
  id: string
  userId: string
  programId: string
  startDate: any
  progress: Record<string, boolean>
  currentWeek: number
}

export interface JournalEntry {
  id: string
  userId: string
  content: string
  date: any
}

export interface Resource {
  id: string
  programId: string
  weekNum: number
  title: string
  type: 'pdf' | 'audio' | 'video'
  url: string
  locked: boolean
}

export interface Affirmation {
  id: string
  userId: string
  text: string
  createdAt: any
}
