import React, { useState, useEffect } from "react";

const Scouter = props => {
  const [upNext, setUpNext] = useState(props.opponents);
  const [previous, setPrevious] = useState([]);
  const [ingame, setIngame] = useState(true);

  const updateOrder = name => {
    if (upNext.length > 3) {
      setPrevious([...previous, upNext.filter(player => player === name)]);
      setUpNext(upNext.filter(player => player !== name));
    } else {
      let addToNext = previous[0];
      let addToPrev = upNext.filter(player => player === name);
      setUpNext([...upNext.filter(player => player !== name), addToNext]);
      setPrevious([...previous.slice(1), addToPrev]);
    }
  };
  const removeUpNext = name => {
    setUpNext(upNext.filter(player => player !== name));
  };

  const removePrevious = name => {
    setPrevious(previous.filter(player => player !== name));
  };

  useEffect(() => {
    if (upNext.length < 3) {
      setUpNext([...upNext, previous[0]]);
      setPrevious(previous.slice(1));
    }
    if (upNext.length + previous.length === 3) {
      setIngame(false);
    }
  });

  if (ingame) {
    return (
      <>
        <h3>Upcoming Opponents</h3>
        {upNext.map(opponent => {
          return (
            <div className="item" key={opponent}>
              <h2>{opponent}</h2>
              <div>
                <button
                  className="btn played"
                  onClick={() => {
                    updateOrder(opponent);
                  }}>
                  Played
                </button>
                <button
                  className="btn remove"
                  onClick={() => {
                    removeUpNext(opponent);
                  }}>
                  Remove
                </button>
              </div>
            </div>
          );
        })}
        <h3>Previous Opponents</h3>
        {previous.map(opponent => {
          return (
            <div className="item previous" key={opponent}>
              <h4>{opponent}</h4>
              <button
                className="btn remove"
                onClick={() => {
                  removePrevious(opponent);
                }}>
                Remove
              </button>
            </div>
          );
        })}
      </>
    );
  } else {
    return (
      <div>
        <h3>You made the top 4! At this point it is no longer possible to predict your next opponent. </h3>
        <h4>Refresh page to restart the scouter.</h4>
      </div>
    );
  }
};

export default Scouter;
