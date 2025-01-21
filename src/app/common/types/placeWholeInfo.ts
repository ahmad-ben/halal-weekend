import { Location } from "./Location"

export interface placeWholeInfo {
  name: string
  type: string
  borough: string
  city: string
  overview: string
  details: dividedInf[]
  images: string[]
  usefulInformation: dividedInf[]
  phoneNumber: string
  website: string
  location: Location
  distance: string
  description: string
  features: dividedInf[]
}

export interface dividedInf {
  iconName: string
  text: string
}


