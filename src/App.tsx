import { useContext, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { ReactComponent as Logo } from "./assets/top-logo.svg"
import mainscene from "./assets/main-scene.png"
import brands from "./assets/brands.png"
import { SearchHotel } from "components"
import { MainDiv } from "styles/main.styles"
import { Room } from "types/types"
import { HotelContext } from "context/Provider"
import { decodeRooms, getUrlParamData } from "lib/lib"

const App = () => {
  const { setRooms, setBrowserUrl, browserUrl } = useContext(HotelContext)

  useEffect(() => {
    const rooms = getUrlParamData("rooms")

    if (rooms) {
      setBrowserUrl(decodeURIComponent(rooms))
    }
  }, [setBrowserUrl])

  // create function to decode rooms parameter and create rooms with Room structure and children with Child structure

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
