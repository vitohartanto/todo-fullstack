import { useEffect, useState } from 'react';
import React from 'react';
import IconCross from '../images/icon-cross.svg';
import IconCheck from '../images/icon-check.svg';
import EditTodo from './EditTodo';

const ListTodos = ({ description, setDescription, setEditMode }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All'); // Menyimpan filter yang dipilih

  const onDeleteHandler = (event, id) => {
    event.stopPropagation();
    deleteTodo(id);
  };

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      });

      console.log(deleteTodo);

      const remainingTodo = todos.filter((todo) => todo.todo_id !== id);
      setTodos(remainingTodo);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getTodos = async () => {
    const response = await fetch('http://localhost:5000/todos');
    const parsedJson = await response.json();

    console.log(parsedJson);

    setTodos(parsedJson);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const onCompletedHandler = (id, currentStatus) => {
    completeTodo(id, currentStatus);
  };

  const completeTodo = async (id, currentStatus) => {
    try {
      const body = { completed: !currentStatus }; // Mengirim status completed sebagai true
      const completeTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (completeTodo.ok) {
        // Perbarui state todos setelah berhasil mengubah status di server
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.todo_id === id ? { ...todo, completed: !currentStatus } : todo
          )
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const clearCompletedHandler = async () => {
    try {
      // Hapus semua todo yang memiliki completed true
      const completedTodos = todos.filter((todo) => todo.completed);
      for (let todo of completedTodos) {
        await deleteTodo(todo.todo_id);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Filter todos based on the selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
  });

  const buttonAllHandler = () => {
    setFilter('All');
  };
  const buttonActiveHandler = () => {
    setFilter('Active');
  };
  const buttonCompletedHandler = () => {
    setFilter('Completed');
  };

  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="flex flex-col items-center ">
      <div className="rounded-lg z-[2] overflow-hidden ">
        {filteredTodos.map((todo) => {
          return (
            <div
              key={todo.todo_id}
              onClick={() => onCompletedHandler(todo.todo_id, todo.completed)}
              className="hover:cursor-pointer relative border-b border-[#777a92] items-center  p-3 w-[327px] bg-[#25273c] text-[#cacde8] flex justify-between"
            >
              {todo.completed === false ? (
                <div
                  className="absolute border-[#777a92] bg-transparent border-2 w-5 h-5 rounded-full"
                  onClick={() =>
                    onCompletedHandler(todo.todo_id, todo.completed)
                  }
                />
              ) : (
                <div className="absolute bg-gradient-custom border-2 w-5 h-5 rounded-full">
                  <img
                    src={IconCheck}
                    alt="checklist"
                    className="absolute top-1 left-[3px]"
                  />
                </div>
              )}

              <div className="flex w-full justify-between">
                {todo.completed === false ? (
                  <p className="pl-8">{todo.description}</p>
                ) : (
                  <p className="pl-8">
                    <s>{todo.description}</s>
                  </p>
                )}

                <EditTodo
                  todo={todo}
                  setDescription={setDescription}
                  setEditMode={setEditMode}
                />
              </div>
              <button
                className=""
                onClick={(event) => onDeleteHandler(event, todo.todo_id)}
              >
                <img src={IconCross} alt="X" />
              </button>
            </div>
          );
        })}
        <div className="bg-[#25273c] w-[327px] text-sm flex text-[#cacde8] p-4 justify-between">
          <p>{itemsLeft} items left</p>
          <button className="hover:text-white" onClick={clearCompletedHandler}>
            Clear Completed
          </button>
        </div>
      </div>

      <div className="gap-x-3 mt-4 rounded-lg w-[327px] p-3 bg-[#25273c] flex justify-center text-[#cacde8]">
        <button
          className={`hover:text-white ${
            filter === 'All' ? 'text-[#3a7bfd]' : ''
          }`}
          onClick={buttonAllHandler}
        >
          All
        </button>
        <button
          className={`hover:text-white ${
            filter === 'Active' ? 'text-[#3a7bfd]' : ''
          }`}
          onClick={buttonActiveHandler}
        >
          Active
        </button>
        <button
          className={`hover:text-white ${
            filter === 'Completed' ? 'text-[#3a7bfd]' : ''
          }`}
          onClick={buttonCompletedHandler}
        >
          Completed
        </button>
      </div>

      <h1 className="text-[#cacde8] text-sm mt-4">
        Drag and drop to reorder list
      </h1>
    </div>
  );
};

export default ListTodos;
