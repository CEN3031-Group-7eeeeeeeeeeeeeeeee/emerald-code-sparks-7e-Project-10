import React, { useState } from "react";
import './UserSettings.less'
const DeleteUser = ({ userID }) => {
  const deleteUserFunction = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you would like to permanently delete this account?"
    );

    console.log(`userID is ${userID}`);

    if (confirmDelete) {
      try {
        // Delete user here using SQL
        const response = await fetch("");
      } catch (error) {
        //Catch any error and log to the screen
        console.error("Error: ", error);
      }
    } else {
      alert("Account deletion canceled.");
    }
  };

  return (
    <div className="delete-container">
      {
        //Check if there is a user ID
        true ? (
          <button className="delete-button" onClick={deleteUserFunction}>
            Delete Account
          </button>
        ) : (
          <p className="delete-error">Please log in to use this feature</p>
        )
      }
    </div>
  );
};

export default DeleteUser;
