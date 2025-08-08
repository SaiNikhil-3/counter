import React, { useState, useEffect } from 'react';
import './App.css';

function CounterAndListApp() {
  const [counter, setCounter] = useState(0);
  const [numbersList, setNumbersList] = useState([]);
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('numbersList'));
    if (storedList) {
      setNumbersList(storedList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('numbersList', JSON.stringify(numbersList));
  }, [numbersList]);

  const handleAddToList = () => {
    setNumbersList([...numbersList, counter]);
  };

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  const handleDeleteItem = (index) => {
    const updatedList = numbersList.filter((_, i) => i !== index);
    setNumbersList(updatedList);
  };

  const handleResetList = () => {
    setNumbersList([]);
    setSortOrder(''); 
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    if (order === 'asc') {
      setNumbersList([...numbersList].sort((a, b) => a - b));
    } else if (order === 'desc') {
      setNumbersList([...numbersList].sort((a, b) => b - a));
    }
  };

  const highestValue =
    numbersList.length > 0 ? Math.max(...numbersList) : '-';
  const lowestValue =
    numbersList.length > 0 ? Math.min(...numbersList) : '-';

  return (
    <div className="app-container">
      <h1>Counter & List App</h1>

      <div className="counter-section">
        <h2>Counter</h2>
        <div className="counter-controls">
          <button onClick={handleDecrement} disabled={counter === 0}>-</button>
          <div className="counter-value">{counter}</div>
          <button onClick={handleIncrement}>+</button>
        </div>
        <button
          onClick={handleAddToList}
          className="add-button"
          disabled={counter === 0}
        >
          Add to List
        </button>
      </div>

      <div className="list-section">
        <h2>Numbers List</h2>
        <div className="list-buttons">
          <button
            onClick={handleResetList}
            className="same-height-btn"
          >
            Reset
          </button>

          <select
            value={sortOrder}
            onChange={(e) => handleSortChange(e.target.value)}
            className="sort-dropdown same-height-btn"
          >
            <option value="">Sort</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <ul className="numbers-list">
          {numbersList.length > 0 ? (
            numbersList.map((number, index) => (
              <li key={index}>
                {number}
                <span
                  className="delete-btn"
                  onClick={() => handleDeleteItem(index)}
                >
                  X
                </span>
              </li>
            ))
          ) : (
            <p>List is empty.</p>
          )}
        </ul>

        <div className="min-max-values">
          <p>Highest Value: <span>{highestValue}</span></p>
          <p>Lowest Value: <span>{lowestValue}</span></p>
        </div>

        <p>Total numbers: {numbersList.length}</p>
      </div>
    </div>
  );
}

export default CounterAndListApp;
