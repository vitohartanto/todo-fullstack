import React from 'react';
import { useState } from 'react';

const InputTodo = () => {
  const [description, setDescription] = useState('');

  const onChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log('You are beautiful');
      const body = { description };
      const response = await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      console.log(response);
      setDescription(''); // Reset input setelah submit
      window.location = '/';
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex justify-center w-full mb-5">
      <form onSubmit={onSubmitHandler} className="relative">
        <p className="border-[#777a92] bg-transparent border-2 w-5 h-5 rounded-full absolute top-4 left-4"></p>
        <input
          type="text"
          value={description}
          onChange={onChangeHandler}
          className="pl-12 w-[327px] rounded-lg p-3 bg-[#25273c] text-white"
          placeholder="Create a new todo..."
        />
      </form>
    </div>
  );
};

export default InputTodo;
