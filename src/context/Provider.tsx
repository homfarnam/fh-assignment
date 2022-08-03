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
  updateChildren: (data: Child, age: number) => void
  deleteRoom: (id: string) => void
  deleteChildren: (id: string) => void
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
  deleteRoom: () => {},
  deleteChildren: () => {},
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

  const deleteChildren = (id: string) => {
    if (!id) return

    setRooms((prev) =>
      prev.map((room) => {
        return {
          ...room,
          children: room.children?.filter((child) => child.id !== id),
        }
      })
    )
  }

  const updateChildren = (data: Child, age: number) => {
    if (!data) return

    setRooms((prev) =>
      prev.map((room) => {
        return {
          ...room,
          children: room.children?.map((child) =>
            child.id === data.id ? { ...child, age } : child
          ),
        }
      })
    )
  }

  const deleteRoom = (id: string) => {
    setRooms((prev) => prev.filter((room) => room.id !== id))
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
        deleteRoom,
        deleteChildren,
      }}
    >
      {children}
    </HotelContext.Provider>
  )
}

export default HotelProvider
