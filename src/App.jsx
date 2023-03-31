import { useEffect, useState } from "react";

import { useGetTodosQuery } from "./redux/todoSlice";
import { selectIds } from "./redux/todoSlice";
import { useSelector } from "react-redux";
import TodosExcerpt from "./TodosExcerpt";

const App = () => {
  const data = useSelector((state) => {
    return selectIds(state);
  });

  const { isLoading, isSuccess, isError, error } = useGetTodosQuery();

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = data.map((todoId) => {
      return <TodosExcerpt key={todoId} todoId={todoId} />;
    });
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <main>
      <h1>Todo List</h1>
      {content}
    </main>
  );
};

export default App;
