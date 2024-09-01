import { useState } from "react";
import RadioButton from "../elements/RadioButton";

import { IoMdAddCircleOutline } from "react-icons/io";
import { LuListTodo } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdPreview } from "react-icons/md";
import { MdOutlineDoneAll } from "react-icons/md";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddTodosPage() {

    const [title , setTitle] = useState("")
    const [description , setDescription] = useState("")
    const [status , setStatus] = useState("todo")

    const addHandler = async () =>{
      const res = await fetch("/api/todos" , {
        method: "POST",
        body: JSON.stringify({title , description, status}),
        headers: {"Content-Type" : "application/json"}
      })
      const data = await res.json()
      if(data.status === "success"){
        toast.success(data.message , {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      }

      setTitle("")
      setDescription("")
      setStatus("todo")
    }

  return (
    <div className="add-form">
      <h2>
        <IoMdAddCircleOutline />
        Add New Todo
      </h2>

      <div className="add-form__input">

        <div className="add-form__input--first">
          <label htmlFor="title">Title:</label>
          <input id="title" type="text" value={title} onChange={(e)=> setTitle(e.target.value)} />
        </div>

        <div  className="add-form__input--textarea">
          <label htmlFor="description">Description:</label>
          <textarea id="description" rows={5} cols={55} value={description} onChange={(e)=> setDescription(e.target.value)} />
        </div>
        
        <div className="add-form__input--second">

          <RadioButton title="Todo" value="todo" status={status} setStatus={setStatus}>
            <LuListTodo />
          </RadioButton>

          <RadioButton title="In Progress" value="inProgress" status={status} setStatus={setStatus}>
            <IoSettingsOutline />
          </RadioButton>

          <RadioButton title="Review" value="review" status={status} setStatus={setStatus}>
            <MdPreview />
          </RadioButton>

          <RadioButton title="Done" value="done" status={status} setStatus={setStatus}>
            <MdOutlineDoneAll />
          </RadioButton>

        </div>
          <button onClick={addHandler}>Add</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddTodosPage;
