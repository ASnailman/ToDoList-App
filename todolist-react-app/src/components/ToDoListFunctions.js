import { useState } from 'react';

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

    const handleInputChange = (event) => {
        setInputValue(event.target.value); // extracts value entered by user in the input
    };

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

    return (
        <div>
            <input 
                type='text' 
                value={inputValue} 
                onChange={handleInputChange} 
                placeholder='Enter an Item' 
            />
            <button onClick={addItem}>Add Item</button>
            <ul>
                {/* not map data structure, method for to iterate over arrays and apply function to each element*/}
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

