import { HotelContext } from "context/Provider"
import { useContext } from "react"
import { ReactComponent as Close } from "../../assets/close.svg"
import CreateRoom from "components/CreateRoom/CreateRoom"
import { Button } from "components"
import { SearchButton } from "components/SearchHotel/SearchHotel.styles"
import { GuestPickerContainer } from "./GuestPicker.styles"
import { CloseButtonType } from "types/types"
import { calcTotal } from "lib/lib"

interface GuestPickerProps {
  handleOpen: (type: CloseButtonType) => void
}

const GuestPicker: React.FC<GuestPickerProps> = ({ handleOpen }) => {
  const { rooms } = useContext(HotelContext)

  // function to serliaze the data to be sent to the url
  const serializeData = () => {
    const serializedData = rooms
      .map((room) => {
        const adults = room.adults.toString()
        const children = room?.children
          ? room?.children?.map((child) => child.age.toString()).join(",")
          : ""
        return adults && children ? `${adults}:${children}` : `${adults}`
      })
      .join("|")

    //  add serializedData to current url
    const url = new URL(window.location.href)
    url.searchParams.set("rooms", encodeURIComponent(serializedData))
    window.history.pushState({}, "", url.href)
  }

  const sumAll = calcTotal(rooms)

  return (
    <GuestPickerContainer>
      <div className="flex items-center justify-start w-full py-5 px-3">
        <Close className="cursor-pointer" onClick={() => handleOpen("Close")} />
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
        <Button
          type="button"
          variant="primary"
          className={SearchButton}
          onClick={() => serializeData()}
        >
          Search - {rooms.length} Rooms - {sumAll} Guests
        </Button>
      </div>
    </GuestPickerContainer>
  )
}

export default GuestPicker
