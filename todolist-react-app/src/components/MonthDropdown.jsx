import React from 'react'
import './Dropdown.css'
import { useState, useEffect, useRef } from 'react' //useEffect handles side effect, useRef handles references to DOM

const MonthDropdown = ({ setMonth }) => {
  const [toggled, setToggle] = useState(false) //set useState to default value of false
  const [selectedOption, setSelectedOption] = useState(null)
  const dropdownRef = useRef(null)

  const handleSelection = (option) => {
    setSelectedOption(option);
    setMonth(option.label); // Pass the selected month back to parent
  };

  useEffect(() => {
    function handler(event) {
        if (dropdownRef.current) {
            if (!dropdownRef.current.contains(event.target)) {
                setToggle(false)
            }
        }
    }

    document.addEventListener('click', handler)
    return () => {
        document.removeEventListener('click', handler)
    }
  })

  //array of options
  const dropdownMonthOptions = [
    {
        id: 0,
        label: "January",
        value: "january"
    },
    {
        id: 1,
        label: "Feburary",
        value: "feburary"
    },
    {
        id: 2,
        label: "March",
        value: "march"
    },
    {
        id: 3,
        label: "April",
        value: "april"
    },
    {
        id: 4,
        label: "May",
        value: "may"
    },
    {
        id: 5,
        label: "June",
        value: "june"
    },
    {
        id: 6,
        label: "July",
        value: "july"
    },
    {
        id: 7,
        label: "August",
        value: "august"
    },
    {
        id: 8,
        label: "September",
        value: "september"
    },
    {
        id: 9,
        label: "October",
        value: "october"
    },
    {
        id: 10,
        label: "November",
        value: "november"
    },
    {
        id: 11,
        label: "December",
        value: "december"
    }
  ];

  return (
    <div className='dropdown'>
        <button className='toggle' onClick={() => {
            setToggle(!toggled)
        }}>
            <span>{selectedOption ? selectedOption.label : "Month"}</span>
        </button>
        {/* dynamic class, wrap classname in backticks */}
        <div className={`options ${toggled ? "visible" : ''}`}> {/* Ternary function, if toggled false, add nothing */}
            {/* callback function to iterate over array and return an option */}
            {/* {dropdownMonthOptions.map((option, index) => {
                return <button onClick={() => {
                    setSelectedOption(option)
                    setToggle(false)
                }}>{option.label}</button>
            })} */}

            {dropdownMonthOptions.map((option) => (
                <button
                    key={option.id}
                    onClick={() => {
                        setSelectedOption(option)
                        setToggle(false)
                        handleSelection(option)
                    }}>{option.label}
                </button>
            ))}
        </div>
    </div>
  )
}

export default MonthDropdown;