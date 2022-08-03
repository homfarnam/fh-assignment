import { createContext, useState } from "react"
import { Child, Room } from "types/types"
import { v4 as uuidv4 } from "uuid"

interface HotelContextType {
  guests: number
  rooms: Room[]
  setGuests: React.Dispatch<React.SetStateAction<number>>
  setRooms?: React.Dispatch<React.SetStateAction<Room[]>>
  updateAdults: (data: Room, amountAdults: number) => void
  createRooms: (data: Room) => void
  createChildren: (data: Room, amountChildren: number) => void
  updateChildren: (count: number, type?: "Plus" | "Minus") => void
}

interface HotelContextProps {
  children: React.ReactNode
}

const initialState: HotelContextType = {
  guests: 0,
  rooms: [],
  setGuests: () => {},
  setRooms: () => {},
  updateAdults: () => {},
  createRooms: () => {},
  createChildren: () => {},
  updateChildren: () => {},
}

export const HotelContext = createContext<HotelContextType>(initialState)

// Create a context provider component that wraps your app and provides the context

const HotelProvider: React.FC<HotelContextProps> = ({ children }) => {
  const [guests, setGuests] = useState<number>(0)
  const [rooms, setRooms] = useState<Room[]>([])
  const [childrenInRoom, setChildrenInRoom] = useState<number>(0)

  const createRooms = (data: Room) => {
    setRooms((prev: Room[]) => [...prev, data])
  }

  const updateAdults = (data: Room, amountAdults: number) => {
    const cloneRooms = [...rooms]

    const newRooms = cloneRooms.map((room) =>
      data.id === room.id
        ? {
            ...room,
            adults: amountAdults,
          }
        : room
    )

    setRooms(newRooms)
  }

  const createChildren = (data: Room, amountChildren: number) => {
    if (amountChildren === 0) {
      return
    }

    console.log({ data, amountChildren })

    const allChildren = Array.from({ length: amountChildren }, () => ({
      age: 8,
      id: uuidv4(),
    }))

    setRooms((prev) => {
      return prev.map((room) =>
        data.id === room.id
          ? {
              ...room,
              children: allChildren,
            }
          : room
      )
    })
  }

  const updateChildren = (count: number, type?: "Plus" | "Minus") => {
    if (type === "Minus") {
      const newAd = childrenInRoom === 0 ? childrenInRoom : childrenInRoom - 1
      setChildrenInRoom(newAd)
    } else if (type === "Plus") {
      const newAd = childrenInRoom === 3 ? childrenInRoom : childrenInRoom + 1
      setChildrenInRoom(newAd)
    } else {
      setChildrenInRoom(count)
    }
  }

  const clearRooms = () => {
    setRooms([])
  }

  return (
    <HotelContext.Provider
      value={{
        setGuests,
        rooms,
        guests,
        updateAdults,
        createRooms,
        createChildren,
        updateChildren,
      }}
    >
      {children}
    </HotelContext.Provider>
  )
}

export default HotelProvider
