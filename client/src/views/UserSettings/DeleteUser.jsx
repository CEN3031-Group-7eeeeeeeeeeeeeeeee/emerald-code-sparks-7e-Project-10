import React, { useState } from "react";
import "./UserSettings.less";
import { deleteCurrentUser } from "../../Utils/requests";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { removeUserSession } from "../../Utils/AuthRequests";

const DeleteUser = ({ userID }) => {
  const navigate = useNavigate();
  const deleteUserFunction = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you would like to permanently delete this account?"
    );

    if (confirmDelete) {
      try {
        // Delete user here using SQL
        const response = await deleteCurrentUser();
        if (response.err) {
          message.error(response.err);
        } else {
          message.info("User deleted");
          removeUserSession();
          navigate("/");
        }
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
