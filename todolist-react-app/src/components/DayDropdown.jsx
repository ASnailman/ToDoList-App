import React from 'react'
import './Dropdown.css'
import { useState, useEffect, useRef } from 'react' //useEffect handles side effect, useRef handles references to DOM

const DayDropdown = ({ setDay }) => {
  const [toggled, setToggle] = useState(false) //set useState to default value of false
  const [selectedOption, setSelectedOption] = useState(null)
  const dropdownRef = useRef(null)

  const handleSelection = (option) => {
    setSelectedOption(option);
    setDay(option.label); // Pass the selected month back to parent
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
  const dropdownDayOptions = [
    {
        id: 0,
        label: "1",
        value: "1"
    },
    {
        id: 1,
        label: "2",
        value: "2"
    },
    {
        id: 2,
        label: "3",
        value: "3"
    },
    {
        id: 3,
        label: "4",
        value: "4"
    },
    {
        id: 4,
        label: "5",
        value: "5"
    },
    {
        id: 5,
        label: "6",
        value: "6"
    },
    {
        id: 6,
        label: "7",
        value: "7"
    },
    {
        id: 7,
        label: "8",
        value: "8"
    },
    {
        id: 8,
        label: "9",
        value: "9"
    },
    {
        id: 9,
        label: "10",
        value: "10"
    },
    {
        id: 10,
        label: "11",
        value: "11"
    },
    {
        id: 11,
        label: "12",
        value: "12"
    },
    {
        id: 12,
        label: "13",
        value: "13"
    },
    {
        id: 13,
        label: "14",
        value: "14"
    },
    {
        id: 14,
        label: "15",
        value: "15"
    },
    {
        id: 15,
        label: "16",
        value: "16"
    },
    {
        id: 16,
        label: "17",
        value: "17"
    },
    {
        id: 17,
        label: "18",
        value: "18"
    },
    {
        id: 18,
        label: "19",
        value: "19"
    },
    {
        id: 19,
        label: "20",
        value: "20"
    },
    {
        id: 20,
        label: "21",
        value: "21"
    },
    {
        id: 21,
        label: "22",
        value: "22"
    },
    {
        id: 22,
        label: "23",
        value: "23"
    },
    {
        id: 23,
        label: "24",
        value: "24"
    },
    {
        id: 24,
        label: "25",
        value: "25"
    },
    {
        id: 25,
        label: "26",
        value: "26"
    },
    {
        id: 26,
        label: "27",
        value: "27"
    },
    {
        id: 27,
        label: "28",
        value: "28"
    },
    {
        id: 28,
        label: "29",
        value: "29"
    },
    {
        id: 29,
        label: "30",
        value: "30"
    },
    {
        id: 30,
        label: "31",
        value: "31"
    }
  ];

  return (
    <div className='dropdown' style={{width:'fit-content'}}>
        <button className='toggle' onClick={() => {
            setToggle(!toggled)
        }}>
            <span>{selectedOption ? selectedOption.label : "Day"}</span>
        </button>
        {/* dynamic class, wrap classname in backticks */}
        <div className={`options ${toggled ? "visible" : ''}`}> {/* Ternary function, if toggled false, add nothing */}
            {/* callback function to iterate over array and return an option */}
            {/* {dropdownDayOptions.map((option, index) => {
                return <button onClick={() => {
                    setSelectedOption(option)
                    setToggle(false)
                }}>{option.label}</button>
            })} */}

            {dropdownDayOptions.map((option) => (
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

export default DayDropdown;