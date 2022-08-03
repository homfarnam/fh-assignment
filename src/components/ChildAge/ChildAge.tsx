import React, { useState } from "react"
import { Child } from "types/types"

interface ChildAgeProps {
  index: number
  onAgeChange: (age: number, data: Child) => void
  onDelete: (id: string) => void
  data: Child
}

const ChildAge: React.FC<ChildAgeProps> = ({
  index,
  onAgeChange,
  onDelete,
  data,
}) => {
  const [age, setAge] = useState<number>(0)

  const handleChangeAge = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onAgeChange(+event.target.value, data)
    setAge(+event.target.value)
  }

  return (
    <div className="flex items-center justify-between mx-5 my-2">
      <label htmlFor={`child-${index}`}>Child {index + 1} age </label>
      <div className="flex items-center gap-2">
        <select
          name={`age-${index}`}
          id={`age-${index}`}
          className="p-1 border"
          onChange={handleChangeAge}
          value={age}
        >
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
        </select>
        <button onClick={() => onDelete(data.id)}>X</button>
      </div>
    </div>
  )
}

export default ChildAge
