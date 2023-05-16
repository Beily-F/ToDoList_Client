import React, { useEffect, useState } from 'react';
import service from './service.js';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    const todos = await service.getTasks();
    console.log(todos);
    setTodos(todos);
  }

  async function createTodo(e) {
    e.preventDefault();
    await service.addTask(newTodo);
    setNewTodo("");//clear input
    await getTodos();//refresh tasks list (in order to see the new one)
  }

  async function updateCompleted(todo) {
    console.log("todoid",todo.id)
    await service.setCompleted(todo.id);
    await getTodos();//refresh tasks list (in order to see the updated one)
  }

  async function deleteTodo(id) {
    await service.deleteTask(id);
    await getTodos();//refresh tasks list
  }

  useEffect(() => {
    console.log("todos")
    getTodos();
    console.log("todos")
  }, []);

  return (
    
    <section className="todoapp">

      {console.log(todos)}

      <header className="header">
        <h1>todos</h1>
        <form onSubmit={createTodo} style={{display:"flex",flexDirection:'row'}} >
        <input className="new-todo" style={{}} placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        {newTodo.length>3&& <input type={'submit'} value="send" style={{margin:"0 auto",padding:"10",textAlign:'left'}} />}
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => {
            return (
              <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input className="toggle" type="checkbox" defaultChecked={todo.isComplete} onChange={(e) => updateCompleted(todo)} />
                  <label>{todo.namw}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section >
  );
}

export default App;