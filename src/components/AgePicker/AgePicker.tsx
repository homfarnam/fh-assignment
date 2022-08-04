import React, { useEffect, useState } from "react"
import { Child } from "types/types"
import { ReactComponent as Remove } from "../../assets/close-red.svg"

interface AgePickerProps {
  /** Pass index of child in array  */
  index: number
  /** Pass function to update child */
  onAgeChange: (age: number, data: Child) => void
  /** Pass function to get child id to delete child */
  onDelete: (id: string) => void
  /** You need to pass child data here */
  childData: Child
}

const AgePicker: React.FC<AgePickerProps> = ({
  index,
  onAgeChange,
  onDelete,
  childData,
}) => {
  const [age, setAge] = useState<number>(8)

  const handleChangeAge = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onAgeChange(+event.target.value, childData)
    setAge(+event.target.value)
  }

  useEffect(() => {
    if (childData) {
      setAge(childData.age)
    }
  }, [childData])

  const allOptions = Array.from({ length: 18 }, (_, index) => index + 1)

  return (
    <div className="flex items-center justify-between mx-5 my-2">
      <label htmlFor={`child-${index}`}>Child {index + 1} age </label>
      <div className="flex items-center gap-2">
        <select
          name={`age-${index}`}
          id={`age-${index}`}
          className="p-1 border px-5 py-2"
          onChange={handleChangeAge}
          value={age}
        >
          {allOptions.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <button onClick={() => onDelete(childData.id)}>
          <Remove className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default AgePicker
