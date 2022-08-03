import type { Room } from "types/types"

const calcAdults = (rooms: Room[]): number =>
  rooms.reduce((acc, curr) => {
    return acc + curr.adults
  }, 0)

// sum of children in all rooms
const calcChildren = (rooms: Room[]): number =>
  rooms.reduce((acc, curr) => {
    return curr?.children ? acc + +curr?.children?.length : 0
  }, 0)

const calcTotal = (rooms: Room[]): number =>
  calcAdults(rooms) + calcChildren(rooms)

export { calcAdults, calcChildren, calcTotal }
