import './ToDoListApp.css';
import { AddTask } from './components/ToDoListFunctions'; //Named Export: used "export function AddTask(), needs curly brackets"
// import './components/SlidingPanel.js';
// import Notification from './components/Notification.jsx'; //Doesn't need curly brackets because it's a default export
// import { useState } from 'react';

function App() {

  // const [isPanelVisible, setIsPanelVisible] = useState(false);
  // const togglePanel = () => {
  //     setIsPanelVisible(!isPanelVisible);
  // };

  return (
    <div className="App">
      {/* <div className=''>
        <Notification /> 
      </div> */}
      <header className="App-header">
        <h1>An Enhanced ToDoList</h1>
      </header>
      <div className='Add-Task'>
        <AddTask />
      </div>
      {/* <div className='Add-Task'>
        <button onClick={togglePanel}>Toggle Sliding Panel</button>
        <sliding-panel visible={isPanelVisible}></sliding-panel>
      </div> */}
    </div>
  );
}

export default App;
