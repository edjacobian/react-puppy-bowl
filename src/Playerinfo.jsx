import React, { useEffect, useState } from 'react';

const cohortName = "2306-FSA-ET-WEB-FT-SF";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`${API_URL}/players`);
    const responseData = await response.json();

    if (!responseData || !responseData.success || !responseData.data || !Array.isArray(responseData.data.players)) {
      console.error("Invalid response...expected an array.");
      return [];
    }

    return responseData.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
    return [];
  }
};

const removePlayer = async (playerId) => {
  try {
    await fetch(`${API_URL}/players/${playerId}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.error(`Whoops, there's trouble removing player #${playerId} from the roster!`, err);
  }
};

const PlayerDetails = ({ player }) => {
  return (
    <div className="player-details">
      <h2>{player.name}</h2>
      <p>ID: {player.id}</p>
      <p>Breed: {player.breed}</p>
      <img src={player.imageUrl} alt={player.name} />
      <button onClick={() => window.history.back()}>Back to all players</button>
    </div>
  );
};

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const playersData = await fetchAllPlayers();
        setPlayers(playersData);
      } catch (err) {
        console.error("Error during initialization:", err);
      }
    };
    init();
  }, []);

  const renderSinglePlayer = (player) => {
    setSelectedPlayer(player);
  };

  return (
    <div>
      <main>
        {selectedPlayer ? (
          <PlayerDetails player={selectedPlayer} />
        ) : (
          players.length === 0 ? (
            <p>No players found.</p>
          ) : (
            players.map((player) => (
              <div key={player.id} className="player-card">
                <h2>{player.name}</h2>
                <p>ID: {player.id}</p>
                <img src={player.imageUrl} alt={player.name} />
                <button onClick={() => renderSinglePlayer(player)}>See details</button>
                <button onClick={() => removePlayer(player.id)}>Remove from roster</button>
              </div>
            ))
          )
        )}
      </main>
    </div>
  );
};

export default Playerinfo;
