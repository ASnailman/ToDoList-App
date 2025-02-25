import './ToDoListApp.css';
import Dropdown from './components/Dropdown'; //Default Export: since I used "export default Dropdown", no curly brackets
import { AddTask } from './components/ToDoListFunctions'; //Named Export: used "export function AddTask(), needs curly brackets"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>An Enhanced ToDoList</h1>
      </header>
      <div className='Add-Task'>
        <AddTask />
        <Dropdown />
      </div>
    
    </div>
  );
}

export default App;
