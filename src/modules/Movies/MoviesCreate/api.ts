import axios from 'axios'

import { Category } from './types'

type Props = {
  label: string
  value: string
}

export async function getCategory(): Promise<Props[]> {
  const response = await axios.get<Category[]>('http://localhost:3030/category')

  const newData: Props[] = []
  response.data.forEach((category) => {
    newData.push({
      label: category.name,
      value: category.name.toLowerCase(),
    })
  })

  return newData
}
