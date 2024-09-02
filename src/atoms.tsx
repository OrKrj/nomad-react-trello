import { atom, selector } from "recoil";

interface IToDoState {
  // 유저가 board를 확장할 가능성을 고려하여
  // key는 string, value는 IToDo type array임을 선언
  [key: string]: IToDo[];
}

export interface IToDo {
  id: number;
  text: string;
}

export const toDoState = atom<IToDoState>({
  key: "todo",
  default: {
    TODO: [],
    DOING: [],
    DONE: [],
  },
});
