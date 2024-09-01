import RadioButton from "@/components/elements/RadioButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { LuListTodo } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdPreview } from "react-icons/md";
import { MdOutlineDoneAll } from "react-icons/md";

function EditTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const [data, setData] = useState([]);

  const router = useRouter();

  const { todoId } = router.query;
  // console.log(todoId)

  useEffect(() => {
    fetchUserTodos(todoId);
  }, []);

  const fetchUserTodos = async (todoId) => {
    const res = await fetch(`/api/todos/${todoId}`);
    const data = await res.json();
    if (data.status === "success") setData(data.data.todos);
  };

  const todo = data.find((todo) => todo._id === todoId);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setStatus(todo.status);
    }
  }, [todo]);

  const UpdateHandler = async (id) => {
    const res = await fetch(`/api/todos/${todoId}` , {
      method: "PATCH",
      body: JSON.stringify({id ,title, description, status}),
      headers: {"Content-Type" : "application/json"}
    })
    const data = await res.json()
    
    if(data.status === "success") router.push("/")
  }

  return (
    <div className="add-form__input">
      <div className="add-form__input--first">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="add-form__input--textarea">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          rows={5}
          cols={55}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="add-form__input--second">
        <RadioButton
          title="Todo"
          value="todo"
          status={status}
          setStatus={setStatus}
        >
          <LuListTodo />
        </RadioButton>

        <RadioButton
          title="In Progress"
          value="inProgress"
          status={status}
          setStatus={setStatus}
        >
          <IoSettingsOutline />
        </RadioButton>

        <RadioButton
          title="Review"
          value="review"
          status={status}
          setStatus={setStatus}
        >
          <MdPreview />
        </RadioButton>

        <RadioButton
          title="Done"
          value="done"
          status={status}
          setStatus={setStatus}
        >
          <MdOutlineDoneAll />
        </RadioButton>
      </div>
      <button onClick={() => UpdateHandler(todoId)}>Update Todo</button>
    </div>
  );
}

export default EditTodo;
