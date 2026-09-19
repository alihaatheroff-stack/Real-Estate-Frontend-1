export type EmployerFiltersState = {
  categories: string[]
  locations: string[]
  radiusMiles: number
  foundedFrom: number
  foundedTo: number
}

export const EMPLOYER_DISTANCE_MIN = 1
export const EMPLOYER_DISTANCE_MAX = 100
export const EMPLOYER_DISTANCE_DEFAULT = 50

export function toggleEmployerFilterValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}
