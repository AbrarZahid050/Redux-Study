import { selectById, useUpdateTodosMutation } from "./redux/todoSlice";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";

const TodosExcerpt = ({ todoId }) => {
  const todo = useSelector((state) => selectById(state, todoId));

  const [updateCompleted] = useUpdateTodosMutation();

  return (
    <article key={todo.id}>
      <div className="todo">
        <input
          type="checkbox"
          checked={todo.completed}
          id={todo.id}
          onChange={() => {
            const newTodo = { ...todo, completed: !todo.completed };
            updateCompleted({ todoId: todo.id, test: newTodo });
          }}
        />
        <label htmlFor={todo.id}>{todo.title}</label>
      </div>
      <button className="trash" onClick={() => {}}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </article>
  );
};

export default TodosExcerpt;
