import { useCallback, useContext, useEffect, useState } from "react"
import type { Child, Room } from "types/types"
import { ReactComponent as Plus } from "../../assets/plus.svg"
import { ReactComponent as Minus } from "../../assets/minus.svg"
import { HotelContext } from "context/Provider"
import { Button } from "components"
import { css } from "@emotion/css"
import ChildAge from "components/ChildAge/ChildAge"
import { v4 as uuidv4 } from "uuid"

interface CreateRoomProps {
  data: Room
  currentRoom: number
}

const inputStyles = css`
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

// { data, currentRoom }: CreateRoomProps

const CreateRoom: React.FC<CreateRoomProps> = ({ data, currentRoom }) => {
  const [adultsInRoom, setAdultsInRoom] = useState<number>(data.adults)

  const [childrenInRoom, setChildrenInRoom] = useState<number>(
    data.children?.length ?? 0
  )

  const { createChildren, updateAdults, rooms, createRooms } =
    useContext(HotelContext)

  const handleAdults = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdultsInRoom(+e.target.value)
  }

  const handleChildren = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChildrenInRoom(+e.target.value)
  }
  useEffect(() => {
    console.log({ rooms, adultsInRoom })
  }, [adultsInRoom, rooms])

  const handleAdultCalculate = (type: "Plus" | "Minus") => {
    let condition

    if (type === "Plus") {
      condition = adultsInRoom === 5 ? adultsInRoom : adultsInRoom + 1
      setAdultsInRoom(condition)

      updateAdults(data, condition)
    } else {
      condition = adultsInRoom === 1 ? adultsInRoom : adultsInRoom - 1

      setAdultsInRoom(condition)
      updateAdults(data, condition)
    }
  }

  const handleChildrenCalculate = (type: "Plus" | "Minus") => {
    let condition
    if (type === "Plus") {
      condition = childrenInRoom === 3 ? childrenInRoom : childrenInRoom + 1
    } else {
      condition = childrenInRoom === 0 ? childrenInRoom : childrenInRoom - 1
    }
    setChildrenInRoom(condition)

    createChildren(data, condition)
  }

  // const handleChildrenCalculate = (type: "Plus" | "Minus") => {
  //   updateChildern(childrenInRoom, type)
  // }

  const handleAgeChange = (age: number, data: Child) => {
    console.log("age change", { data, age })
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

  return (
    <div className="p-3 text-black">
      <span>Room {currentRoom + 1}</span>

      <div className="mt-5 w-full flex items-center justify-between">
        <label htmlFor="adults" className="font-medium">
          Adults
        </label>
        <div className="flex items-center gap-2">
          <Minus
            className="cursor-pointer"
            onClick={() => handleAdultCalculate("Minus")}
          />
          <input
            type="number"
            className={`border w-10 py-1 text-center ${inputStyles}`}
            value={adultsInRoom}
            onChange={handleAdults}
            min={1}
            max={5}
          />
          <Plus
            className="cursor-pointer"
            onClick={() => handleAdultCalculate("Plus")}
          />
        </div>
      </div>
      <div className="mt-2 w-full flex items-center justify-between">
        <label htmlFor="children" className="font-medium">
          Children
        </label>
        <div className="flex items-center gap-2">
          <Minus
            className="cursor-pointer"
            onClick={() => handleChildrenCalculate("Minus")}
          />
          <input
            type="number"
            className={`border w-10 py-1 text-center ${inputStyles}`}
            value={childrenInRoom}
            onChange={handleChildren}
            min={0}
            max={3}
          />
          <Plus
            className="cursor-pointer"
            onClick={() => handleChildrenCalculate("Plus")}
          />
        </div>
      </div>
      <div className="flex flex-col">
        {data.children &&
          data.children?.length > 0 &&
          data.children.map((item, index) => {
            return (
              <ChildAge
                key={item.id}
                index={index}
                handleChange={handleAgeChange}
                data={item}
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
