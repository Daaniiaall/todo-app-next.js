import Link from "next/link";
import { LiaEdit } from "react-icons/lia";

function Tasks({ data , fetchData , back , next}) {

    const changeStatus = async (id , status) => {
      const res = await fetch("/api/todos" , {
        method: "PATCH",
        body: JSON.stringify({id , status}),
        headers: {"Content-Type" : "application/json"}
      })
      const data = await res.json()

      if(data.status === "success") { fetchData(); }
    }

  return (
    <div className="tasks">
      {data?.map((item) => (
        <div className="tasks__card" key={item._id}>
          <span className={item.status}></span>

        <div>

          <div className="tasks__card--info">
            <h4>{item.title}</h4>
            <h5>{item.description}</h5>
          </div>

          <div className="tasks__card--link">
            <Link href={`/todo/${item._id}`}>
              <LiaEdit />
            </Link>
          </div>

        </div>


          <div>
            {back ? (<button className="button-back" onClick={() => changeStatus(item._id , back)}>Back</button>) : null}
            {next ? (<button className="button-next" onClick={() => changeStatus(item._id , next)}>Next</button>) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
