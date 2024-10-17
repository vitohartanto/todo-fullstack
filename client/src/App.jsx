import InputTodo from './components/InputTodo';
import TopComponent from './components/TopComponent';
import ListTodos from './components/ListTodos';

function App() {
  return (
    <>
      <div className="absolute bg-[#161722] h-full w-full z-[-3]"></div>
      <TopComponent />
      <InputTodo />
      <ListTodos />
    </>
  );
}

export default App;
