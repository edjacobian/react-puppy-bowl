import React from 'react';

const AddPuppyForm = ({ newPlayer, handleInputChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={newPlayer.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Breed:
        <input
          type="text"
          name="breed"
          value={newPlayer.breed}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          name="imageUrl"
          value={newPlayer.imageUrl}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Add Player</button>
    </form>
  );
};

export default AddPuppyForm;
