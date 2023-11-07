import React, { useState, useEffect } from "react";
import Logo from "../../assets/casmm_logo.png";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import "./CreateUserPage.less";
import CreateUser from "./CreateUser";

export default function CreateUserPage() {
  return (
    <div className="container nav-padding">
      <NavBar />
      <div id="main-header">Create Personal Account</div>
      <div className="create-user-page-container">
      <h2 className="page-title">Create New User Below</h2>
        <div className="create-user-container">
            <CreateUser/>
        </div>
      </div>
    </div>
  );
}