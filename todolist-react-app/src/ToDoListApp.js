import './ToDoListApp.css';
import { AddTask } from './ToDoListFunctions';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>An Enhanced ToDoList</h1>
      </header>
      <div className='Add-Task'>
        <AddTask />
      </div>
    </div>
  );
}

export default App;
