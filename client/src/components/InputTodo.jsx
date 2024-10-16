import React from 'react';
import { useState } from 'react';

const InputTodo = () => {
  const [description, setDescription] = useState('');

  const onChangeHandler = (e) => {
    setDescription(e.target.value);
  };
  return (
    <div>
      <form>
        <input type="text" value={description} onChange={onChangeHandler} />
      </form>
    </div>
  );
};

export default InputTodo;
