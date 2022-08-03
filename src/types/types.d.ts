interface Child {
  id: string
  age: number
}

interface Room {
  id: string
  adults: number
  children?: Child[]
}

type CalcType = "Plus" | "Minus"
type CloseButtonType = "Open" | "Close"

export { Child, Room, CalcType, CloseButtonType }
