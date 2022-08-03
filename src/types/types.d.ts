interface Child {
  id: string
  age: number
}

interface Room {
  id: string
  adults: number
  children?: Child[]
}

export { Child, Room }
