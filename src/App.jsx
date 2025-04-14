import React, { useState } from "react";
import './App.css';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleAddExpense = () => {
    if (!description.trim() || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Please enter a valid description and a positive amount.");
      return;
    }

    setExpenses((prevExpenses) => [
      ...prevExpenses,
      { id: Date.now(), description, amount: parseFloat(amount) },
    ]);

    setDescription("");
    setAmount("");
    setError("");
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Expense Tracker</h1>
        <div className="input-group">
          <label className="label">Description</label>
          <input
            className="input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Grocery"
          />
        </div>

        <div className="input-group">
          <label className="label">Amount</label>
          <input
            className="input"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 50"
          />
        </div>
        {error && <p>{error}</p>}

        <button onClick={handleAddExpense} className="button">
          Add Expense
        </button>

        <div className="expenseList">
          <h2 className="subtitle">Expenses</h2>
          {expenses.length === 0 ? (
            <p className="noExpenses">No expenses added yet.</p>
          ) : (
            <ul className="list">
              {expenses.map((expense) => (
                <li key={expense.id} className="listItem">
                  <span>{expense.description}</span>
                  <span>${expense.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="total">
          <h2 className="subtitle">Total Expenses</h2>
          <p className="totalAmount">${totalExpenses.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}


export default ExpenseTracker;