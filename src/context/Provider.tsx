import { createContext, useState } from "react"
import { Child, Room } from "types/types"
import { v4 as uuidv4 } from "uuid"

interface HotelContextType {
  guests: number
  rooms: Room[]
  setGuests: React.Dispatch<React.SetStateAction<number>>
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>
  updateAdults: (data: Room, amountAdults: number) => void
  createRooms: (data: Room) => void
  createChildren: (data: Room, amountChildren: number) => void
  updateChildren: (data: Child, age: number) => void
  deleteRoom: (id: string) => void
  deleteChildren: (id: string) => void
  deleteAllData: () => void
  browserUrl: string
  setBrowserUrl: React.Dispatch<React.SetStateAction<string>>
  createOneRoom: () => void
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
  deleteAllData: () => {},
  browserUrl: "",
  setBrowserUrl: () => {},
  createOneRoom: () => {},
}

export const HotelContext = createContext<HotelContextType>(initialState)

const HotelProvider: React.FC<HotelContextProps> = ({ children }) => {
  const [guests, setGuests] = useState<number>(0)
  const [rooms, setRooms] = useState<Room[]>([])
  const [browserUrl, setBrowserUrl] = useState("")

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

  const createOneRoom = () => {
    if (rooms.length <= 7) {
      createRooms({
        id: uuidv4(),
        adults: 1,
        children: [],
      })
    }
  }

  const deleteRoom = (id: string) => {
    setRooms((prev) => prev.filter((room) => room.id !== id))
  }

  const deleteAllData = () => {
    setRooms([])
    setGuests(0)
  }

  return (
    <HotelContext.Provider
      value={{
        setGuests,
        rooms,
        setRooms,
        guests,
        updateAdults,
        createRooms,
        createChildren,
        updateChildren,
        deleteRoom,
        deleteChildren,
        deleteAllData,
        browserUrl,
        createOneRoom,
        setBrowserUrl,
      }}
    >
      {children}
    </HotelContext.Provider>
  )
}

export default HotelProvider
