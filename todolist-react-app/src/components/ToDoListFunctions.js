import { useState } from 'react';
import { useEffect } from 'react';
import DayDropdown from './DayDropdown'; //Default Export: since I used "export default Dropdown", no curly brackets
import MonthDropdown from './MonthDropdown'; //Default Export: since I used "export default Dropdown", no curly brackets
import './TimeChooser.js'; 

/* counter example
export function Counter() {
    const [count, setCount] = useState(0); // count is state var, setCount is function name

    return (
        <div>
            <p>you clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>  {/* () => is arrow function, () holds params }
                click me!
            </button>
        </div>
    );
} 
*/

var taskData = []; //global variable to store task data

export function AddTask() {
    const [inputValue, setInputValue] = useState(''); //inputValue state var, setInputValue function set to empty
    const [items, setItems] = useState([]); //items state var, setItems function set to empty array

    const [selectedMonth, setSelectedMonth] = useState('Month');
    const [selectedDay, setSelectedDay] = useState('Day');
    const [selectedTime, setSelectedTime] = useState({ hour: '12', minute: '00', ampm: 'AM' });

    const handleInputChange = (event) => {
        setInputValue(event.target.value); // extracts value entered by user in the input
    };

    // const handleTimeChange = (time) => {
    //     setSelectedTime(time); // Update time from the time-picker
    // };

    // Use useEffect to call getTasks on component mount (components rederned on DOM)
    useEffect(() => {
        getTasks();
    }, []); // Empty dependency array means this effect runs once when the component mounts
    
    const addItem = async () => {
        console.log('Add Item button clicked');
        //!= : loose inequality, doesn't check data type
        //!== : strict inequality, checks data type
        if (inputValue.trim() !== '' && selectedMonth !== 'Month' && selectedDay !== 'Day') {
            const task = {
                month: selectedMonth,
                day: selectedDay,
                time: `${selectedTime.hour}:${selectedTime.minute.toString().padStart(2, '0')} ${selectedTime.ampm}`,
                description: inputValue,
            }
            // const task = `${selectedMonth} ${selectedDay} at ${selectedTime.hour}:${selectedTime.minute.toString().padStart(2, '0')} ${selectedTime.ampm} - ${inputValue}`;
            // setItems([...items, task]);
            // setInputValue('');
            console.log('Task to be added:', task);
        
            // Send task to the server
            try {
                const response = await fetch('http://localhost:5000/add-task', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(task),
                });
        
                if (response.ok) {
                    console.log('Task added to database');
                    // ... is spread operator, spreads out existing elements of items array
                    // If items is [1, 2, 3] and inputValue is 4, the expression [...items, inputValue] will produce [1, 2, 3, 4].
                    // alt. to spread operator: concat, slice
                        //items.concat(): creates new arr and combines items arr with input value | less lines
                        //items.slice() & items.push(): create new arr with slice from items arr, push new item | more explicit, more lines
                    setItems([...items, `${task.month} ${task.day} at ${task.time} - ${task.description}`]);
                    setInputValue('');
                } else {
                    console.error('Failed to add task');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log('Invalid input or date selection');
        }
    };
      
    const getTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/get-tasks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const data = await response.json();
                taskData = data;
                setItems(data.map(task => 
                    `${task.month} ${task.day} at ${task.time} - ${task.description}`
                ));
                console.log('Tasks fetched from database:', data);
            } else {
                console.error('Failed to fetch tasks');
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    //for time chooser
    useEffect(() => {
        const timePicker = document.querySelector('time-picker');
        
        if (timePicker) {
            const handleTimeChangeEvent = (event) => {
                setSelectedTime(event.detail); // Update state with new time
            };
    
            timePicker.addEventListener('time-change', handleTimeChangeEvent);
    
            return () => {
                timePicker.removeEventListener('time-change', handleTimeChangeEvent);
            };
        }
    }, []);
    

    //notification system
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         console.log('Checking for task notifications...');
    
    //         const now = new Date();
    //         const currentMonth = now.toLocaleString('default', { month: 'long' }); // "March"
    //         const currentDay = now.getDate().toString(); // "31"
    
    //         let hours = now.getHours();
    //         let minutes = now.getMinutes().toString().padStart(2, '0');
    //         let seconds = now.getSeconds().toString().padStart(2, '0'); // Add seconds to ensure precision
    //         let ampm = hours >= 12 ? 'PM' : 'AM';
    
    //         // Convert 24-hour format to 12-hour format
    //         hours = hours % 12 || 12;
    //         const currentTime = `${hours}:${minutes}:${seconds} ${ampm}`; // Example: "12:30:05 PM"
    //         console.log(currentTime)
    
    //         console.log(`Current time: ${currentMonth} ${currentDay} at ${currentTime}`);
    
    //         if (!taskData || taskData.length === 0) {
    //             console.log('No tasks in taskData.');
    //             return;
    //         }
    
    //         taskData.forEach(task => {
    //             console.log(`Checking task: ${task.month} ${task.day} at ${task.time} - ${task.description}`);
    
    //             // Make sure the task's time format includes seconds (by default, your tasks don't store seconds)
    //             const taskTime = task.time.includes(':') ? task.time.replace(/(AM|PM)/, `:00 $1`) : task.time;
    
    //             if (task.month === currentMonth && task.day === currentDay && taskTime === currentTime) {
    //                 console.log('MATCH FOUND! Task time reached!');
    //                 alert(`Task deadline has been reached: ${task.description}`);
    //             }
    //         });
    //     }, 1000); // Run every second
    
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <div>
            <div style={{display: 'flex'}}>
                <MonthDropdown setMonth={setSelectedMonth} />
                <DayDropdown setDay={setSelectedDay} />
                <time-picker />
                <input 
                    type='text' 
                    value={inputValue} 
                    onChange={handleInputChange} 
                    placeholder='Enter an Item' 
                />
                <button onClick={addItem}>Add Item</button>
            </div>
            
            <ul>
                {/* not map data structure, method for to iterate over arrays and apply function to each element*/}
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}