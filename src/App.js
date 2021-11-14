import React, { useState } from "react";
import Scouter from "./scouter";

function App() {
  // const testUsers = ["Soju", "Kiyoon", "Milk", "GV8", "Kurum", "Socks", "Ramblin"];
  const [showSetup, setShowSetup] = useState(true);
  const [player, setPlayer] = useState("");
  const [opponents, setOpponents] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    if (player && opponents.length < 7) {
      setOpponents([...opponents, player]);
      setPlayer("");
    }
  };

  const handleStart = () => {
    if (opponents.length === 7) {
      setShowSetup(false);
    }
  };

  return (
    <div className="container">
      <h1>TFT Scouter</h1>
      {showSetup && (
        <div>
          <h3>Enter your 7 opponents then begin scouter </h3>
          <button className="btn begin" onClick={handleStart}>
            Begin Scouter
          </button>
          <form>
            <div className="form">
              <label htmlFor="playerName">Player: </label>
              <input
                type="text"
                id="playerName"
                value={player}
                onChange={e => {
                  setPlayer(e.target.value);
                }}
              />
              <button className="btn" type="submit" onClick={handleSubmit}>
                Add
              </button>
            </div>
          </form>
          {opponents.map(opponent => {
            return (
              <div className="item" key={opponent}>
                <h4>{opponent}</h4>
              </div>
            );
          })}
        </div>
      )}
      {!showSetup && <Scouter opponents={opponents} />}
    </div>
  );
}

export default App;
