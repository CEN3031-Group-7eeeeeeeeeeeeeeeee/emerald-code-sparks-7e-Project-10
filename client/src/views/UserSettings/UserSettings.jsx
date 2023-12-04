import React, { useState, useEffect } from "react";
import Logo from "../../assets/casmm_logo.png";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import "./UserSettings.less";
import DeleteUser from "./DeleteUser";
import { getCurrentUser, updateUser } from "../../Utils/requests";
import useCurrentUser from "../../Utils/useCurrentUser";
import { message } from "antd";

export default function UserSettings() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const { user, loading, error } = useCurrentUser(); //Fetch the current user

  //Update information once user is done loading
  useEffect(() => {
    if (!loading && user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user, loading]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleBugReport = (event) => {
    navigate("/bugreport");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`New username: ${username}`);
    console.log(`New password: ${password}`);
    console.log(`New email: ${email}`);

    // const newUser = { ...user, username, email, password };
    const newUser = { ...user, username, email, password };
    console.log(JSON.stringify(newUser));
    updateUser(newUser)
      .then((response) => {
        message.info("Successfully Updated");
        console.log("user has been updated");
        console.log(response);
      })
      .catch((error) => {
        console.log("error updating user");
        console.log(error);
        message.error("Error updating user");
      });
  };

  return (
    <div className="container nav-padding">
      <NavBar />
      <div id="main-header">User Settings</div>
      <div className="user-settings-container">
        <div id="container-title">My Account</div>
        <div className="user-settings-inner">
          <form onSubmit={handleSubmit} className="my-account-form">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <button type="submit" className="submit-changes">
              Save Changes
            </button>
          </form>
          <div className="other-settings-container">
            <label htmlFor="other-settings">Other Settings:</label>
            <DeleteUser userID={user ? user.id : null} />
            <button
              type="submit"
              className="bug-button"
              onClick={handleBugReport}
            >
              Report Bug
            </button>
          </div>
        </div>
      </div>

      <div className="user-settings-container">
        <div id="container-title">My Classrooms</div>
      </div>
    </div>
  );
}
