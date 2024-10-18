import InputTodo from './components/InputTodo';
import TopComponent from './components/TopComponent';
import ListTodos from './components/ListTodos';
import { useState } from 'react';
import './App.css';

function App() {
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(null); // Menyimpan ID todo yang sedang diedit
  return (
    <>
      <div className="absolute bg-[#161722] h-full w-full z-[-3]"></div>
      <TopComponent />
      <InputTodo
        description={description}
        setDescription={setDescription}
        editMode={editMode}
        setEditMode={setEditMode}
      />
      <ListTodos
        description={description}
        setDescription={setDescription}
        setEditMode={setEditMode}
      />
    </>
  );
}

export default App;
