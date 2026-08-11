import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTodo, removeTodo } from "./slices/TodoSlice"
import DeleteIcon from "./DeleteIcon/DeleteIcon"

function App() {
  const todoList = useSelector(state => state.todo)
  const dispatch = useDispatch()
  const [input,setInput ] = useState('')
     useEffect(() => {
        localStorage.setItem(
            "todo",
            JSON.stringify(todoList)
        );
    }, [todoList]);
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!input){
      return
    }
    dispatch(addTodo({
      id:Date.now(),
      title:input,
      createdAt:new Date()
    }))
    setInput("")
  }
  return (
    <div className="bg-dark text-white">
      <div className="container bg-dark mt-5">
        <div className="row">
          <div className="col-12 p-3">
            <form onSubmit={handleSubmit} action="">
              <h3>Add Task</h3>
              <input maxLength={15} type="text" name="" value={input} className="form-control" onChange={(e)=> setInput(e.target.value)} id="" />
              <input  type="submit" className="btn btn-success mt-3 w-100" value="Add" />
            </form>
          </div>
        </div>
      </div>
        <hr />
      <div className="container bg-dark p-5">
        <div className="row">
        
          {
            todoList.length>0?(
              todoList.map((todo)=>(
                <div key={todo.id} className="col-12 d-flex justify-content-between align-items-center shadow-sm mt-3 border p-2">
                  <div className="d-flex flex-column align-items-start">
                      <h5>Task: {todo.title}</h5>
                       <p style={{fontSize:"13px"}}><i>dated:</i> {new Date(todo.createdAt).toLocaleDateString()}</p>
                      <p style={{fontSize:"13px"}}><i>created at:</i> {new Date(todo.createdAt).toLocaleTimeString()}</p>
                     
                  </div>
                  <div className="p-2">
                    <button className="btn btn-danger"  onClick={() => dispatch(removeTodo(todo.id))}>
                        <DeleteIcon />
                    </button>
                    
                  </div>
                </div>
              ))
            ):(<p>No List Available</p>)
          }
        </div>
      </div>
    </div>
  )
}

export default App
