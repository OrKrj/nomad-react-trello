import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 700px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 30px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;

    if (!destination) return;
    // drag and drop이 같은 board 내 이루어진 경우
    if (destination.droppableId === source.droppableId) {
      setToDos((originalBoards) => {
        const boardCopy = [...originalBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        // 기존에는 stirng을 삭제, 삽입하면 됐지만,
        // 이제 toDo는 id, text 객체로 이루어진 배열임
        boardCopy.splice(destination?.index, 0, taskObj);
        // drag and drop한 배열만 두고, 나머진 그대로 반환
        // drag and drop한 board는 boardCopy 값으로 반환
        return {
          ...originalBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    // drag and drop이 서로 다른 board에서 각각 이루어질 때
    if (destination.droppableId !== source.droppableId) {
      setToDos((orignalBoards) => {
        const dragBoardCopy = [...orignalBoards[source.droppableId]];
        const taskObj = dragBoardCopy[source.index];
        const dropBoardCopy = [...orignalBoards[destination.droppableId]];
        dragBoardCopy.splice(source.index, 1);
        dropBoardCopy.splice(destination.index, 0, taskObj);

        return {
          ...orignalBoards,
          [source.droppableId]: dragBoardCopy,
          [destination.droppableId]: dropBoardCopy,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
