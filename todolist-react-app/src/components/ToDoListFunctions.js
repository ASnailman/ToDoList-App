import { useState } from 'react';
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

export function AddTask() {
    const [inputValue, setInputValue] = useState(''); //inputValue state var, setInputValue function set to empty
    const [items, setItems] = useState([]); //items state var, setItems function set to empty array

    const [selectedMonth, setSelectedMonth] = useState('Month');
    const [selectedDay, setSelectedDay] = useState('Day');
    const [selectedTime, setSelectedTime] = useState({ hour: '12', minute: '00', ampm: 'AM' });

    const handleInputChange = (event) => {
        setInputValue(event.target.value); // extracts value entered by user in the input
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time); // Update time from the time-picker
    };

    /*
    const addItem = () => {
        //!= : loose inequality, doesn't check data type
        //!== : strict inequality, checks data type
        if (inputValue.trim() !== '') {
            // ... is spread operator, spreads out existing elements of items array
            // If items is [1, 2, 3] and inputValue is 4, the expression [...items, inputValue] will produce [1, 2, 3, 4].
            // alt. to spread operator: concat, slice
                //items.concat(): creates new arr and combines items arr with input value | less lines
                //items.slice() & items.push(): create new arr with slice from items arr, push new item | more explicit, more lines
            setItems([...items, inputValue]); //spread out items in items array
            setInputValue(''); // set input value back to empty
        }
    };
    */

    // const addItem = () => {
    //     if (inputValue.trim() !== '' && selectedMonth !== 'Month' && selectedDay !== 'Day') {
    //         const task = `${selectedMonth} ${selectedDay} at ${selectedTime.hour}:${selectedTime.minute.toString().padStart(2, '0')} ${selectedTime.ampm} - ${inputValue}`;
    //         setItems([...items, task]);
    //         setInputValue('');
    //     }
    // };
    
    const addItem = async () => {
        console.log('Add Item button clicked');
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
      

    return (
        <div>
            <div style={{display: 'flex'}}>
                <MonthDropdown setMonth={setSelectedMonth} />
                <DayDropdown setDay={setSelectedDay} />
                <time-picker onTimeChange={handleTimeChange} />
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

