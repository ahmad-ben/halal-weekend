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

// <--! My Make Some Of Them Optional -->
// <--! If borough and city are the same ?? -->
// <--! In The Specific Place Component If We HAve Less Than 4 Images -->
