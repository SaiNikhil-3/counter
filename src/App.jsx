import React, { useState, useEffect } from 'react';
import './App.css';

function CounterAndListApp() {
  const [counter, setCounter] = useState(0); // State for the counter, starts at 0
  const [numbersList, setNumbersList] = useState([]);

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('numbersList'));
    if (storedList) {
      setNumbersList(storedList);
    }
  }, []);

  // Save data to localStorage whenever the numbersList changes
  useEffect(() => {
    localStorage.setItem('numbersList', JSON.stringify(numbersList));
  }, [numbersList]);

  // Function to add the current counter value to the list
  const handleAddToList = () => {
    // Add the counter value to the list
    setNumbersList([...numbersList, counter]);
  };

  // Functions for incrementing and decrementing the counter
  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  // The change is here: we only decrement if the counter is greater than 0
  const handleDecrement = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  // Function to reset the list
  const handleResetList = () => {
    setNumbersList([]);
  };

  // Function to sort the list manually
  const handleSortList = () => {
    const sortedList = [...numbersList].sort((a, b) => a - b);
    setNumbersList(sortedList);
  };

  return (
    <div className="app-container">
      <h1>Counter & List App</h1>

      <div className="counter-section">
        <h2>Counter</h2>
        <div className="counter-controls">
          <button onClick={handleDecrement}>-</button>
          <div className="counter-value">{counter}</div>
          <button onClick={handleIncrement}>+</button>
        </div>
        <button onClick={handleAddToList} className="add-button">Add to List</button>
      </div>

      <div className="list-section">
        <h2>Numbers List</h2>
        <div className="list-buttons">
          <button onClick={handleResetList}>Reset</button>
          <button onClick={handleSortList}>Sort</button>
        </div>
        <ul className="numbers-list">
          {numbersList.length > 0 ? (
            numbersList.map((number, index) => (
              <li key={index}>{number}</li>
            ))
          ) : (
            <p>List is empty.</p>
          )}
        </ul>
        <p>Total numbers: {numbersList.length}</p>
      </div>
    </div>
  );
}

export default CounterAndListApp;