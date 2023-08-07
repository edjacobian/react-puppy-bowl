import React from 'react';

const Puppyinfo = ({ players }) => {
  return (
    <div>
      <h2>Puppy Information</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            <p>Name: {player.name}</p>
            <p>Breed: {player.breed}</p>
            <img src={player.imageUrl} alt={player.name} className="puppy-image" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Puppyinfo;
