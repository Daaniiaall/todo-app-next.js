import { useEffect, useState } from "react";
import Tasks from "../modules/Tasks";

function HomePage() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    if (data.status === "success") {
      setTodos(data.data.todos);
    }
  };

  return (
    <div className="home-page">

      <div className="home-page--todo">
        <p>Todo</p>
        <Tasks data={todos.todo} fetchData={fetchData} next="inProgress" />
      </div>

      <div className="home-page--inProgress">
        <p>In Progress</p>
        <Tasks data={todos.inProgress} fetchData={fetchData} next="review" back="todo" />
      </div>

      <div className="home-page--review">
        <p>Review</p>
        <Tasks data={todos.review} fetchData={fetchData} next="done" back="inProgress" />
      </div>

      <div className="home-page--done">
        <p>Done</p>
        <Tasks data={todos.done} fetchData={fetchData} back="review" />
      </div>

    </div>
  );
}

export default HomePage;
