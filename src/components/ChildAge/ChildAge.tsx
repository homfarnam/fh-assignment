import React, { useState } from "react"
import { Child } from "types/types"

interface ChildAgeProps {
  index: number
  handleChange: (age: number, data: Child) => void
  data: Child
}

const ChildAge: React.FC<ChildAgeProps> = ({ index, handleChange, data }) => {
  const [age, setAge] = useState<number>(data.age)

  const handleChangeAge = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAge(+e.target.value)
    handleChange(age, data)
  }

  return (
    <div className="flex items-center justify-between mx-5 my-2">
      <label htmlFor={`child-${index}`}>Child {index + 1} age </label>
      <div className="flex items-center gap-2">
        <select
          name={`age-${index}`}
          id={`age-${index}`}
          className="border p-1"
          defaultValue="age"
          onChange={handleChangeAge}
          value={age}
        >
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
        </select>
      </div>
    </div>
  )
}

export default ChildAge
