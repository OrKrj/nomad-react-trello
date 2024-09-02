import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  min-height: 300px;
  padding-top: 10px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#b2bec3"
      : props.isDraggingFromThis
      ? "#dfe6e9"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  margin-top: 10px;
  padding: 10px 5px;
  width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 20px;
  font-size: 20px;
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

const Form = styled.form`
  width: 80%;
  border-radius: 20px;
  input {
    text-align: center;
    width: 100%;
  }
`;

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        // 반대로 위에서부터 추가하려면
        // [newTodo, ...allBoards[boardId]]
        // 참고로 []는 키를 함수 내에서 동적 키로 사용하는
        // js ES6 computed property name 문법임
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
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
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
