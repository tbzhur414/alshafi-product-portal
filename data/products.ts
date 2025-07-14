export interface Product {
  id: string
  name: string
  category: string
  image: string
  rate: string
  unit: string
  transhipmentRates: Array<{
    region: string
    rate: string
  }>
  regionWiseRates: Array<{
    region: string
    rate: string
  }>
  policies: string[]
}
