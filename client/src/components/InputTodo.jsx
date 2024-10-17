import React from 'react';

const InputTodo = ({ description, setDescription, editMode, setEditMode }) => {
  const onChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const body = { description };

      if (editMode) {
        // Jika sedang dalam mode edit, lakukan update todo
        await fetch(`http://localhost:5000/todos/${editMode}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        setEditMode(null); // Kembali ke mode normal setelah edit selesai
      } else {
        // Jika tidak dalam mode edit, lakukan penambahan todo baru
        await fetch('http://localhost:5000/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
      }

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
