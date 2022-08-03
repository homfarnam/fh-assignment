import { useContext, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { ReactComponent as Logo } from "./assets/top-logo.svg"
import mainscene from "./assets/main-scene.png"
import brands from "./assets/brands.png"
import { SearchHotel } from "components"
import { MainDiv } from "styles/main.styles"
import { Room } from "types/types"
import { HotelContext } from "context/Provider"

const App = () => {
  const { setRooms, setBrowserUrl, browserUrl } = useContext(HotelContext)

  useEffect(() => {
    //  get url and decode rooms parameter
    const url = window.location.href
    const urlParams = new URL(url)

    const rooms = urlParams.searchParams.get("rooms") as string
    if (rooms) {
      setBrowserUrl(decodeURIComponent(rooms))
    }
  }, [setBrowserUrl])

  // create function to decode rooms parameter and create rooms with Room structure and children with Child structure
  const decodeRooms = (rooms: string) => {
    const roomsArray = rooms?.split("|")
    const roomsDecoded = roomsArray?.map((room, i) => {
      const roomArray = room.split(":")

      const adults = +roomArray?.[0]

      const children = roomArray?.[1]

      const childrenArray = children?.split(",")

      const childrenDecoded = childrenArray?.map((child) => ({
        id: uuidv4(),
        age: parseInt(child),
      }))

      return {
        id: uuidv4(),
        adults,
        children: childrenDecoded,
      }
    })
    return roomsDecoded
  }

  useEffect(() => {
    if (browserUrl !== "") {
      const allRooms = decodeRooms(browserUrl)

      setRooms(allRooms as Room[])
    }
  }, [setRooms, browserUrl])

  return (
    <div className="flex flex-col items-center justify-center h-screen text-red-300 bg-gradient-to-br from-gray-300 via-teal-700 to-gray-800">
      <MainDiv
        style={{
          backgroundImage: `url(${mainscene})`,
        }}
      >
        <Logo />
        <h2>Find the perfect deal, always.</h2>

        <SearchHotel />
        <img src={brands} alt="brands" className="top-24 relative" />
      </MainDiv>
    </div>
  )
}

export default App
