export type Category = {
  id: number
  name: string
}

export type MoviesCreateProps = {
  moviesId?: string
}

export type FieldTypes = {
  id?: number
  name?: string
  active?: boolean
  description?: string
  category?: string
}
