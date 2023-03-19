import ContentPage from "./ContentPage";
import { useGetTodosQuery } from "./redux/apiSlice";

const App = () => {
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = <ContentPage data={todos} />;
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
