import { atom, selector } from "recoil";

interface IToDoState {
  // 유저가 board를 확장할 가능성을 고려하여
  // key는 string, value는 string array임을 선언
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "todo",
  default: {
    TODO: ["a", "b"],
    DOING: ["c", "d"],
    DONE: ["e", "f"],
  },
});
