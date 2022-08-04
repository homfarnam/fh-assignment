import { useContext, useEffect, useState } from "react"
import type { CalcType, Child, Room } from "types/types"
import { HotelContext } from "context/Provider"
import { Button, AgePicker, AdultChange, ChildrenChange } from "components"
import { checkRoomSize } from "lib/lib"

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
    createOneRoom,
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

  /**
   *
   * @param type - "Plus" | "Minus"
   *
   * @description
   * This function is used to update the number of adults in a room.
   *
   */
  const handleAdultCalculate = (type: CalcType) => {
    let condition

    if (type === "Plus") {
      if (checkRoomSize(data) === 5) {
        return
      }
      condition = adultsInRoom === 5 ? adultsInRoom : adultsInRoom + 1
    } else {
      condition = adultsInRoom === 1 ? adultsInRoom : adultsInRoom - 1
    }
    setAdultsInRoom(condition)
    updateAdults(data, condition)
  }

  /**
   *
   * @param type - "Plus" | "Minus"
   * @returns
   * This function is used to create a child in a room.
   */
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

  /**
   *
   * @param age - number
   * @param data - Child
   *
   * @description
   * This function is used to update the age of a child in a room.
   */
  const handleAgeChange = (age: number, data: Child) => {
    updateChildren(data, age)
  }

  // function to create new room with default values

  /**
   *
   * @param id - string
   * @description
   * This function is used to delete a child in a room.
   */
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
        onClick={() => createOneRoom()}
        className="text-[#0071F3] bg-[#F7FBFF] w-full py-3 mt-3 border-[#DAE9FA] border rounded-lg"
      >
        <strong className="text-xl">+ </strong>
        Add Room
      </Button>
    </div>
  )
}

export default CreateRoom
