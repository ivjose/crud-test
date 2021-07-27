import axios from 'axios'

import { MoviePrams } from './types'

export async function getMovies<T>(params: MoviePrams): Promise<T[]> {
  const response = await axios.get<T[]>(' http://localhost:3030/movies', {
    params: { ...params },
  })

  return response.data
}
