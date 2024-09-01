import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  min-height: 300px;
  padding-top: 30px;
  padding: 20px 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver ? "pink" : props.isDraggingFromThis ? "red" : "blue"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 30px;
  font-size: 20px;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {/* 처음 인자와 다음 인자의 역할은 정해져 있을 뿐*/}
        {/* provided, snapshot이란 파라미터명은 임의의 이름임*/}
        {/* 단, 두 이름은 type명이기도 해서 사용하는 게 좋아보임 */}
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            // draggingFromThisWidth는 string 또는 undefined이기 때문에
            // string 값을 가지면 Boolean 값은 true가 된다.
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} index={index} toDo={toDo} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
