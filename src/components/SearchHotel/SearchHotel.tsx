import Input from "components/Shared/Input/Input"
import { useState } from "react"
import { ReactComponent as Location } from "../../assets/location.svg"
import { ReactComponent as Where } from "../../assets/where.svg"
import { ReactComponent as Guests } from "../../assets/people-numbers.svg"
import DatePicker from "react-datepicker"
import {
  DatePickers,
  Form,
  NumberOfGuests,
  SearchButton,
  searchInput,
} from "./SearchHotel.styles"

const SearchHotel = () => {
  const [searchCity, setSearchCity] = useState("")

  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const [numberOfGuests, setNumberOfGuests] = useState("2")
  return (
    <Form className="">
      <div className="w-full relative flex items-center">
        <Input
          type="text"
          placeholder="Type city, place, or hotel name"
          firstIcon={<Location className="z-99 w-6 h-6 absolute left-2" />}
          secondIcon={<Where className="z-99 w-5 h-5 right-3 absolute" />}
          className={searchInput}
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
      </div>
      <div className={DatePickers}>
        <div>
          <DatePicker
            className="border-2 border-gray-300 rounded-lg p-2 text-black text-sm"
            selected={startDate}
            onChange={(date) => setStartDate(date as Date)}
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
            onChange={(date) => setEndDate(date as Date)}
            selectsEnd
            placeholderText="Check out"
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </div>

        <div className="relative flex items-center w-auto">
          <Input
            type="number"
            firstIcon={<Guests className="z-99 w-5 h-5 absolute left-1" />}
            className={NumberOfGuests}
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
            min={0}
          />
        </div>
      </div>
      <div className="w-full mt-3">
        <button className={SearchButton}>Search</button>
      </div>
    </Form>
  )
}

export default SearchHotel
