//FinalcODE
import { MdDelete } from "react-icons/md";

import React, { useState } from "react";

const App = () => {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [expense, setExpense] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");

  // Error States
  const [incomeError, setIncomeError] = useState(false);
  const [expenseError, setExpenseError] = useState(false);
  const [descError, setDescError] = useState(false);

  const incomeHandler = (e) => {
    setIncome(e.target.value);
    setIncomeError(false);
  };

  const expenseHandler = (e) => {
    setExpense(e.target.value);
    setExpenseError(false);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
    setDescError(false);
  };

  const addIncome = () => {
    if (!income || description.trim() === "") {
      setIncomeError(!income);
      setDescError(description.trim() === "");
      return;
    }
    setTransactions([
      ...transactions,
      { type: "income", amount: income, desc: description },
    ]);
    setTotalIncome((prev) => prev + Number(income));
    setBalance((prev) => prev + Number(income));
    setIncome("");
    setDescription("");
  };

  const addExpense = () => {
    if (!expense || description.trim() === "") {
      setExpenseError(!expense);
      setDescError(description.trim() === "");
      return;
    }
    setTransactions([
      ...transactions,
      { type: "expense", amount: expense, desc: description },
    ]);
    setTotalExpense((prev) => prev + Number(expense));
    setBalance((prev) => prev - Number(expense));
    setExpense("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex justify-center items-center p-6">
      <div className="bg-white/10 backdrop-blur-lg shadow-lg rounded-3xl p-8 w-full sm:w-3/4 lg:w-1/2 border border-white/20">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-6 text-white uppercase tracking-widest">
          Expense Tracker
        </h1>

        {/* Balance */}
        <div className="text-center mb-8">
          <p className="text-2xl font-semibold text-gray-300">Balance</p>
          <span
            className={`text-5xl font-bold ${
              balance >= 0 ? "text-green-400" : "text-red-500"
            }`}
          >
            ${balance.toFixed(2)}
          </span>
        </div>

        {/* Income and Expense */}
        <div className="flex justify-around gap-4 mb-8  ">
          <div className="bg-black/30 border border-green-400/20 rounded-lg p-6 shadow-lg text-center w-1/2  transition hover:scale-105 ">
            <h2 className="text-lg text-green-400">Income</h2>
            <p className="text-2xl font-bold text-green-300">
              ${totalIncome.toFixed(2)}
            </p>
          </div>
          <div className="bg-black/30 border border-red-400/20 rounded-lg p-6 shadow-lg text-center w-1/2 transition hover:scale-105 ">
            <h2 className="text-lg text-red-400">Expense</h2>
            <p className="text-2xl font-bold text-red-300">
              ${totalExpense.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            placeholder="Description"
            className={`w-full p-3 rounded-lg bg-black/40 border ${
              descError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-blue-400"
            } text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all`}
            value={description}
            onChange={descriptionHandler}
          />
          <input
            type="number"
            placeholder="Income"
            className={`w-full p-3 rounded-lg bg-black/40 border ${
              incomeError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-green-400"
            } text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all`}
            value={income}
            onChange={incomeHandler}
          />
          <input
            type="number"
            placeholder="Expense"
            className={`w-full p-3 rounded-lg bg-black/40 border ${
              expenseError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-red-400"
            } text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all`}
            value={expense}
            onChange={expenseHandler}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={addIncome}
            className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-white px-6 py-2 rounded-full shadow-lg transform hover:scale-105 transition-all"
          >
            Add Income
          </button>
          <button
            onClick={addExpense}
            className="bg-gradient-to-r from-red-500 to-red-400 hover:from-red-400 hover:to-red-300 text-white px-6 py-2 rounded-full shadow-lg transform hover:scale-105 transition-all"
          >
            Add Expense
          </button>
        </div>

        {/* Transactions */}
        <div className="max-h-60 overflow-y-auto bg-black/20 p-4 rounded-lg border border-white/10">
          {transactions.map((txn, i) => (
            <div
              key={i}
              className={`flex justify-between p-2 rounded-lg mb-2 ${
                txn.type === "income"
                  ? "text-green-300 bg-green-900/30"
                  : "text-red-300 bg-red-900/30"
              }`}
            >
              <span className="">${txn.amount}</span>
              {/* <span className="text-right">
                <MdDelete />
              </span> */}
              <span>{txn.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
