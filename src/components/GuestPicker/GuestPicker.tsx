import { HotelContext } from "context/Provider"
import { useContext } from "react"
import { ReactComponent as Close } from "../../assets/close.svg"
import CreateRoom from "components/CreateRoom/CreateRoom"
import { Button } from "components"
import { SearchButton } from "components/SearchHotel/SearchHotel.styles"
import { GuestPickerContainer } from "./GuestPicker.styles"

interface GuestPickerProps {
  handleOpen: () => void
}

const GuestPicker: React.FC<GuestPickerProps> = ({ handleOpen }) => {
  const { rooms } = useContext(HotelContext)

  // sum of adults in all rooms
  let adults = rooms.reduce((acc, curr) => {
    return acc + curr.adults
  }, 0)

  // sum of children in all rooms
  let children = rooms.reduce((acc, curr) => {
    return curr?.children ? acc + +curr?.children?.length : 0
  }, 0)

  return (
    <GuestPickerContainer>
      <div className="flex items-center justify-start w-full py-5 px-3">
        <Close className="cursor-pointer" onClick={handleOpen} />
        <h3 className="justify-self-center mx-auto text-black">
          Who is staying?
        </h3>
      </div>
      <hr className="h-1 bg-gray w-11/12 mx-auto" />
      <div>
        {rooms.map((room, index) => {
          return <CreateRoom key={room.id} data={room} currentRoom={index} />
        })}
      </div>
      <div>
        <Button type="button" variant="primary" className={SearchButton}>
          Search - {rooms.length} Rooms - {adults + children} Guests
        </Button>
      </div>
    </GuestPickerContainer>
  )
}

export default GuestPicker
