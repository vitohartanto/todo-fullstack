import { useEffect, useState } from 'react';
import React from 'react';
import IconCross from '../images/icon-cross.svg';
import { CiEdit } from 'react-icons/ci';

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const response = await fetch('http://localhost:5000/todos');
    const parsedJson = await response.json();

    console.log(parsedJson);

    setTodos(parsedJson);
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div>
      {/* yang benar */}
      <div className="flex flex-col items-center ">
        <div className="rounded-lg z-[2] overflow-hidden">
          {todos.map((todo) => {
            return (
              <div
                key={todo.todo_id}
                className="relative border-b border-[#777a92] items-center  p-3 w-[327px] bg-[#25273c] text-[#cacde8] flex justify-between"
              >
                <p className="absolute border-[#777a92] bg-transparent border-2 w-5 h-5 rounded-full"></p>
                <div className="flex w-full justify-between">
                  <p className="pl-8">{todo.description}</p>
                  <button className="mr-6">
                    <CiEdit />
                  </button>
                </div>
                <button>
                  <img src={IconCross} alt="X" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* <div className="flex flex-col items-center ">
        <div className="rounded-lg z-[2] overflow-hidden">
          <div className="relative border-b border-[#777a92] items-center  p-3 w-[327px] bg-[#25273c] text-[#cacde8] flex justify-between">
            <p className="absolute border-[#777a92] bg-transparent border-2 w-5 h-5 rounded-full"></p>
            <div className="flex w-full justify-between">
              <p className="pl-8">Jog around the park 3x</p>
              <button className="mr-6">
                <CiEdit />
              </button>
            </div>
            <button>
              <img src={IconCross} alt="X" />
            </button>
          </div>
          <div className="relative border-b border-[#777a92] items-center  p-3 w-[327px] bg-[#25273c] text-[#cacde8] flex justify-between">
            <p className="absolute border-[#777a92] bg-transparent border-2 w-5 h-5 rounded-full"></p>
            <div className="flex w-full justify-between">
              <p className="pl-8">Something else</p>
              <button className="mr-6">
                <CiEdit />
              </button>
            </div>
            <button>
              <img src={IconCross} alt="X" />
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ListTodos;
