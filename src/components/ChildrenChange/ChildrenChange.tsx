import React from "react"
import { CalcType } from "types/types"
import { ReactComponent as Plus } from "../../assets/plus.svg"
import { ReactComponent as Minus } from "../../assets/minus.svg"
import { inputStyles } from "styles/main.styles"

interface ChildrenChangeProps {
  children: number
  onChildrenCalculate: (type: CalcType) => void
  onAddChildren: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ChildrenChange: React.FC<ChildrenChangeProps> = ({
  children,
  onAddChildren,
  onChildrenCalculate,
}) => {
  return (
    <div className="mt-2 w-full flex items-center justify-between">
      <label htmlFor="children" className="font-medium">
        Children
      </label>
      <div className="flex items-center gap-2">
        <Minus
          className="cursor-pointer"
          onClick={() => onChildrenCalculate("Minus")}
        />
        <input
          type="number"
          className={`border w-10 py-1 text-center ${inputStyles}`}
          value={children}
          onChange={onAddChildren}
          min={0}
          max={3}
        />
        <Plus
          className="cursor-pointer"
          onClick={() => onChildrenCalculate("Plus")}
        />
      </div>
    </div>
  )
}

export default ChildrenChange
