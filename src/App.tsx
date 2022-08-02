import { ReactComponent as Logo } from "./assets/top-logo.svg"
import mainscene from "./assets/main-scene.png"
import brands from "./assets/brands.png"
import { SearchHotel } from "components"
import { MainDiv } from "styles/main.styles"

const App = () => {
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
