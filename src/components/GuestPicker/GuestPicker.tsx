import styled from "@emotion/styled"
import { HotelContext } from "context/Provider"
import { useContext } from "react"
import { ReactComponent as Close } from "../../assets/close.svg"
import CreateRoom from "components/CreateRoom/CreateRoom"

const GuestPickerContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1000;
  position: absolute;
  background-color: white;
  top: 0;

  h3 {
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  }
`

interface GuestPickerProps {
  handleOpen: () => void
}

const GuestPicker: React.FC<GuestPickerProps> = ({ handleOpen }) => {
  const { rooms } = useContext(HotelContext)

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
      <div></div>
    </GuestPickerContainer>
  )
}

export default GuestPicker
