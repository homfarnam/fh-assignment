import { ReactComponent as Plus } from "../../assets/plus.svg"
import { ReactComponent as Minus } from "../../assets/minus.svg"
import { inputStyles } from "styles/main.styles"
import type { CalcType } from "types/types"

interface AdultChangeProps {
  adults: number
  onAdultCalculate: (type: CalcType) => void
  onAddAdult: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AdultChange: React.FC<AdultChangeProps> = ({
  onAdultCalculate,
  adults,
  onAddAdult,
}) => {
  return (
    <div className="mt-5 w-full flex items-center justify-between">
      <label htmlFor="adults" className="font-medium">
        Adults
      </label>
      <div className="flex items-center gap-2">
        <Minus
          className="cursor-pointer"
          onClick={() => onAdultCalculate("Minus")}
        />
        <input
          type="number"
          className={`border w-10 py-1 text-center ${inputStyles}`}
          value={adults}
          onChange={onAddAdult}
          min={1}
          max={5}
        />
        <Plus
          className="cursor-pointer"
          onClick={() => onAdultCalculate("Plus")}
        />
      </div>
    </div>
  )
}

export default AdultChange
