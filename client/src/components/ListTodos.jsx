import { useEffect, useState } from 'react';
import React from 'react';
import IconCross from '../images/icon-cross.svg';
import { CiEdit } from 'react-icons/ci';

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const response = await fetch('http://localhost:5000/todos');
    const parsedJson = response.json();

    setTodos(parsedJson);
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div className="flex justify-center">
      <div className="rounded-lg p-3 w-[327px] bg-[#25273c] text-[#cacde8] flex justify-between">
        <p className="border-[#777a92] bg-transparent border-2 w-5 h-5 rounded-full"></p>
        <p className="">Jog around the park 3x</p>
        <button>
          <CiEdit />
        </button>
        <button>
          <img src={IconCross} alt="X" />
        </button>
      </div>
    </div>
  );
};

export default ListTodos;
