import React, { useState, useEffect } from "react";
import Logo from "../../assets/casmm_logo.png";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import "./UserSettings.less";
import DeleteUser from "./DeleteUser";

export default function UserSettings() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userID = user["id"];

  return (
    <div className="container nav-padding">
      <NavBar />
      <div id="main-header">User Settings</div>
      <div className="user-settings-container">
        <h2 className="settings-title">Sample User Settings Below</h2>
        <div className="delete-user-container">
          <h2>Delete User: </h2>
          <DeleteUser userID={user.id} />
        </div>
      </div>
    </div>
  );
}
