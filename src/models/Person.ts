import PersonStatus from "./PersonStatus";

export default interface Person {
  id: number;
  x: number;
  y: number;
  oldX: number;
  oldY: number;
  oldDirectionX: number;
  oldDirectionY: number;
  status: PersonStatus;
}
