import React, { useState, useEffect } from "react";
import Logo from "../../assets/casmm_logo.png";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import "./UserSettings.less";

export default function UserSettings() {
  return (
    <div className="container nav-padding">
      <NavBar />
      <div id="main-header">User Settings</div>
      <div className="user-settings-container">
        <h2>hi</h2>
        <h2>i don't know which settings should go here yet</h2>

        <h2>enjoy this for now</h2>
      </div>
    </div>
  );
}
