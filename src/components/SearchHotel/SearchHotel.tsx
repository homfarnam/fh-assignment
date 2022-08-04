import { useContext, useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import { v4 as uuidv4 } from "uuid"
import Input from "components/Shared/Input/Input"
import { ReactComponent as Location } from "../../assets/location.svg"
import { ReactComponent as Where } from "../../assets/where.svg"
import { ReactComponent as Guests } from "../../assets/people-numbers.svg"
import {
  DatePickers,
  Form,
  NumberOfGuestsStyle,
  SearchButton,
  searchInput,
} from "./SearchHotel.styles"
import GuestPicker from "components/GuestPicker/GuestPicker"
import { HotelContext } from "context/Provider"
import { Button } from "components"
import { CloseButtonType } from "types/types"
import { calcTotal, getUrlParamData } from "lib/lib"

const SearchHotel = () => {
  const [searchCity, setSearchCity] = useState<string>("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [openPicker, setOpenPicker] = useState<boolean>(false)

  const { setGuests, createRooms, deleteAllData, rooms } =
    useContext(HotelContext)

  const [numberOfGuests, setNumberOfGuests] = useState<string>("2")

  useEffect(() => {
    const sum = calcTotal(rooms)

    setGuests(sum)
    setNumberOfGuests(sum.toString())
  }, [rooms, setGuests])

  useEffect(() => {
    const loc = getUrlParamData("location")
    const checkIn = getUrlParamData("checkIn")
    const checkOut = getUrlParamData("checkOut")

    if (loc) {
      setSearchCity(loc)
    }
    if (checkIn) {
      setStartDate(new Date(checkIn))
    }
    if (checkOut) {
      setEndDate(new Date(checkOut))
    }
  }, [])

  const handleOpenPicker = (type: CloseButtonType) => {
    if (type === "Open") {
      setOpenPicker(true)
      if (rooms.length === 0) {
        createRooms({ id: uuidv4(), adults: +numberOfGuests })

        const checkIn = startDate?.toISOString()
        const checkOut = endDate?.toISOString()

        const url = new URL(window.location.href)
        url.searchParams.set("location", searchCity)
        url.searchParams.set("checkIn", checkIn!!)
        url.searchParams.set("checkOut", checkOut!!)

        window.history.pushState({}, "", url.href)
      }
    } else {
      setOpenPicker(false)
      deleteAllData()
    }
  }

  const handleGuests = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfGuests(e.target.value)
    setGuests(+e.target.value)
  }

  return (
    <Form>
      <div className="w-full relative flex items-center">
        <Input
          type="text"
          placeholder="Type city, place, or hotel name"
          firstIcon={<Location className="z-99 w-6 h-6 absolute left-2" />}
          secondIcon={<Where className="z-99 w-5 h-5 right-3 absolute" />}
          className={searchInput}
          value={searchCity}
          onChange={(e) => {
            setSearchCity(e.target.value)
          }}
        />
      </div>
      <div className={DatePickers}>
        <div>
          <DatePicker
            className="border-2 border-gray-300 rounded-lg p-2 text-black text-sm"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date as Date)
            }}
            selectsStart
            startDate={startDate}
            placeholderText="Check in"
            endDate={endDate}
          />
        </div>

        <div>
          <DatePicker
            className="border-2 border-gray-300 rounded-lg p-2 text-black text-sm"
            selected={endDate}
            onChange={(date) => {
              setEndDate(date as Date)
            }}
            selectsEnd
            placeholderText="Check out"
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </div>

        <div className="relative flex items-center w-auto">
          <Input
            name="guests"
            type="number"
            firstIcon={<Guests className="z-99 w-5 h-5 absolute left-1" />}
            className={NumberOfGuestsStyle}
            value={numberOfGuests}
            onChange={handleGuests}
            min={0}
          />
        </div>
      </div>
      <div className="w-full mt-3">
        <Button
          type="button"
          variant="primary"
          className={SearchButton}
          onClick={() => handleOpenPicker("Open")}
        >
          Search
        </Button>
      </div>
      {openPicker && <GuestPicker handleOpen={handleOpenPicker} />}
    </Form>
  )
}

export default SearchHotel
