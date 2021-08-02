export type MoviePrams = {
  name?: string
  active?: 'true' | 'false'
}

export type MovieProps = {
  id: number
  name: string
  active: boolean
  description: string
  category: string
}
