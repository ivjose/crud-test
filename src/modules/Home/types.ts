export type MoviePrams = {
  title?: string
  status?: 'active' | 'inactive'
}

export type MovieProps = {
  id: number
  title: string
  status: 'active' | 'inactive'
  description: string
  year: string
}
