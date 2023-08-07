import React, { useState, useEffect } from 'react';
import './App.css';
import Puppyinfo from './Puppyinfo';
import AddPuppyForm from './AddPuppyForm';

const cohortName = "2306-FSA-ET-WEB-FT-SF";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

function App() {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    breed: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(`${API_URL}/players`);
        const responseData = await response.json();

        if (
          !responseData ||
          !responseData.success ||
          !responseData.data ||
          !Array.isArray(responseData.data.players)
        ) {
          console.error("Invalid response...expected an array.");
          return;
        }

        setPlayers(responseData.data.players);
      } catch (err) {
        console.error("Uh oh, trouble fetching players!", err);
      }
    };

    fetchPlayers();
  }, []);
  // console.log(fetchPlayers);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`${API_URL}/players`, {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(newPlayer),
      });
  
      const newPlayerData = await response.json();
      console.log("New player response:", newPlayerData);
  
      if (newPlayerData.success) {
        // Fetch updated players list and update state
        const updatedPlayers = await fetchAllPlayers();
        setPlayers(updatedPlayers);
      } else {
        console.error("Error adding player:", newPlayerData.message);
      }
    } catch (err) {
      console.error("Uh oh, trouble adding player!", err);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Puppy Bowl</h1>
        <AddPuppyForm
          newPlayer={newPlayer}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <Puppyinfo players={players} />
      </div>
    </div>
  );
}

export default App;
