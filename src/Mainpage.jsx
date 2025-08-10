import React, { useState } from "react";
import "./Mainpage.css";

function Mainpage() {
  const [score, setScore] = useState(0);
  const [tempscore, setTempScore] = useState(0);
  const [history, setHistory] = useState([]);
const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });


  const sum = () => {
    const newEntry = {
      MainValue: score,
      addedWith: tempscore,
      sum:score+tempscore,
      Date: new Date().toLocaleString(),
    };
    setHistory([newEntry, ...history]); // newest first
    setScore(score + tempscore);
    setTempScore(0);
  };

  const sortHistory = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...history].sort((a, b) => {
      if (key === "Date") {
        // Convert date strings to Date objects for comparison
        return direction === "asc"
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      } else {
        return direction === "asc"
          ? a[key] - b[key]
          : b[key] - a[key];
      }
    });

    setHistory(sorted);
  };

  return (
    <div className="mainpage">
      {/* Score Control Section */}
      <h1>Counter APP</h1>
      <div className="score-section">
        <div className="controls">
          <button className="btn minus" onClick={() => setTempScore(tempscore - 1)}>
            -
          </button>

          <h1 className="score-display">
            {score} {tempscore > 0 && <span> + </span>} {tempscore != 0 && <span> {tempscore} </span>}
          </h1>

          <button className="btn plus" onClick={() => setTempScore(tempscore + 1)}>
            +
          </button>
        </div>

        <button className="btn apply" onClick={sum}>
          Apply
        </button>

        <h4>Scorll To view History</h4>
        <h2>  ↓  </h2>
      </div>

      {/* History Section */}
      <div className="history-section">
        <h2>History</h2>
        <table>
          <thead>
             <th>
                Main Value
                <button className="sort-btn" onClick={() => sortHistory("MainValue")}>
                  ⇅
                </button>
              </th>
              <th>
                Added With
                <button className="sort-btn" onClick={() => sortHistory("addedWith")}>
                  ⇅
                </button>
              </th>
               <th>
                sum
                <button className="sort-btn" onClick={() => sortHistory("sum")}>
                  ⇅
                </button>
              </th>
              <th>
                Date
                <button className="sort-btn" onClick={() => sortHistory("Date")}>
                  ⇅
                </button>
              </th>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan="3" className="no-history">
                  No history yet
                </td>
              </tr>
            ) : (
              history.map((item, index) => (
                <tr key={index}>
                  <td>{item.MainValue}</td>
                  <td>{item.addedWith}</td>
                  <td>{item.sum}</td>
                  <td>{item.Date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Mainpage;
