import { useContext, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import type { CalcType, Child, Room } from "types/types"
import { HotelContext } from "context/Provider"
import { Button, AgePicker, AdultChange, ChildrenChange } from "components"

interface CreateRoomProps {
  data: Room
  currentRoom: number
}

const CreateRoom: React.FC<CreateRoomProps> = ({ data, currentRoom }) => {
  const [adultsInRoom, setAdultsInRoom] = useState<number>(data.adults)

  const [childrenInRoom, setChildrenInRoom] = useState<number>(
    data.children?.length ?? 0
  )

  const {
    createChildren,
    updateAdults,
    updateChildren,
    rooms,
    createRooms,
    deleteRoom,
    deleteChildren,
  } = useContext(HotelContext)

  const handleAdults = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdultsInRoom(+e.target.value)
  }

  const handleChildren = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChildrenInRoom(+e.target.value)
  }
  useEffect(() => {
    console.log({ rooms, adultsInRoom })
  }, [adultsInRoom, rooms])

  const checkRoomSize = (room: Room): number => {
    return room.adults + (room.children?.length ?? 0)
  }

  const handleAdultCalculate = (type: CalcType) => {
    let condition

    if (type === "Plus") {
      if (checkRoomSize(data) === 5) {
        return
      }
      condition = adultsInRoom === 5 ? adultsInRoom : adultsInRoom + 1
      setAdultsInRoom(condition)
      updateAdults(data, condition)
    } else {
      condition = adultsInRoom === 1 ? adultsInRoom : adultsInRoom - 1

      setAdultsInRoom(condition)
      updateAdults(data, condition)
    }
  }

  const handleChildrenCalculate = (type: CalcType) => {
    let condition
    if (type === "Plus") {
      if (checkRoomSize(data) === 5) {
        return
      }
      condition = childrenInRoom === 3 ? childrenInRoom : childrenInRoom + 1
    } else {
      condition = childrenInRoom === 0 ? childrenInRoom : childrenInRoom - 1
    }
    setChildrenInRoom(condition)

    createChildren(data, condition)
  }

  const handleAgeChange = (age: number, data: Child) => {
    updateChildren(data, age)
  }

  // function to create new room with default values
  const createRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (rooms.length <= 7) {
      createRooms({
        id: uuidv4(),
        adults: 1,
        children: [],
      })
    }
  }

  const handleDeleteChild = (id: string) => {
    deleteChildren(id)
    setChildrenInRoom((prev) => prev - 1)
  }

  return (
    <div className="p-3 text-black">
      <div className="flex items-center justify-between">
        <span>Room {currentRoom + 1}</span>
        <span
          className="text-red-500 cursor-pointer"
          onClick={() => deleteRoom(data.id)}
        >
          Remove Room
        </span>
      </div>
      <AdultChange
        adults={adultsInRoom}
        onAddAdult={handleAdults}
        onAdultCalculate={handleAdultCalculate}
      />
      <ChildrenChange
        children={childrenInRoom}
        onAddChildren={handleChildren}
        onChildrenCalculate={handleChildrenCalculate}
      />

      <div className="flex flex-col">
        {data.children &&
          data.children?.length > 0 &&
          data.children.map((item, index) => {
            return (
              <AgePicker
                key={item.id}
                index={index}
                onAgeChange={handleAgeChange}
                childData={item}
                onDelete={handleDeleteChild}
              />
            )
          })}
      </div>
      <hr className="h-1 bg-black/10 w-11/12 mx-auto mt-4" />
      <Button
        type="button"
        variant="primary"
        onClick={createRoom}
        className="text-[#0071F3] bg-[#F7FBFF] w-full py-3 mt-3 border-[#DAE9FA] border rounded-lg"
      >
        <strong className="text-xl">+ </strong>
        Add Room
      </Button>
    </div>
  )
}

export default CreateRoom
