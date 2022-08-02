import { createContext } from "react"

/**
 * Total guests
 * Room{
 *    id
 *    adult
 *    children :{
 *        id
 *        age
 *        }[]
 *    }[]
 */

interface Child {
  id: number
  age: number
}

interface Room {
  id: number
  adult: number
  children: Child[]
}

interface HotelContextType {
  totalGuests: number
  rooms: Room[]
}

interface HotelContextProps {
  children: React.ReactNode
}

const initialState: HotelContextType = {
  totalGuests: 0,
  rooms: [],
}

export const HotelContext = createContext<HotelContextType>(initialState)

// Create a context provider component that wraps your app and provides the context

const HotelProvider: React.FC<HotelContextProps> = ({ children }) => {
  return (
    <HotelContext.Provider value={initialState}>
      {children}
    </HotelContext.Provider>
  )
}

export default HotelProvider
