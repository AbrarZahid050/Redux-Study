import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useUpdateTodosMutation } from "./redux/apiSlice";

const ContentPage = ({ data }) => {
  const [temp, setTemp] = useState(data);
  const [updateTodo] = useUpdateTodosMutation();

  const changeCheckboxHandler = (event) => {
    //first taking the id.
    const id = event.target.id;

    setTemp((oldArr) => {
      const newArr = oldArr.map((obj) => {
        //checking the condition
        if (obj.id == id) {
          const newCompleted = obj.completed;
          //first sending the data to db then updating the state
          updateTodo({ ...obj, completed: !newCompleted });
          return { ...obj, completed: !newCompleted };
        }
        //returning the other obj if the condition is not met.
        return obj;
      });
      return newArr;
    });
  };

  const changeInputHandler = (event) => {
    //first taking the id.
    const id = event.target.id;

    setTemp((oldArr) => {
      const newArr = oldArr.map((obj) => {
        //checking the condition
        if (obj.id == id) {
          const newTitle = event.target.value;
          //first sending the data to db then updating the state
          updateTodo({ ...obj, title: newTitle });
          return { ...obj, title: newTitle };
        }
        //returning the other obj if the condition is not met.
        return obj;
      });
      return newArr;
    });
  };

  return temp.map((todo, index) => {
    return (
      <article key={todo.id}>
        <div className="todo">
          <input
            type="checkbox"
            checked={todo.completed}
            id={todo.id}
            ii={index}
            onChange={changeCheckboxHandler}
          />

          <input
            type="text"
            id={todo.id}
            value={todo.title}
            onChange={changeInputHandler}
          />
        </div>
        <button className="trash" onClick={() => {}}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </article>
    );
  });
};

export default ContentPage;
