import React, { useState } from "react";
import "./CreateUserPage.less";
import { createUser, getStudentClassroom } from "../../Utils/requests";
import { message } from "antd";
import { makeRequest } from "../../Utils/requests.js";
import { useNavigate } from "react-router-dom";
import { setUserSession } from "../../Utils/AuthRequests";
// import {eachLimit} from "../../../public/lib/avrgirl-arduino.global";

const CreateUser = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateEmail = (emailInput) => {
    //validates email address
    return String(emailInput)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (passwordInput) => {
    if (passwordInput != null) {
      return passwordInput;
    } else return false;
  };

  //handler functions for emails / passwords
  const handleEmailChange = (entry) => {
    setEmail(entry.target.value);
  };

  const handleUsernameChange = (entry) => {
    setUsername(entry.target.value);
  };

  const handlePasswordChange = (entry) => {
    setPassword(entry.target.value);
  };

  const createUserFunction = async (e) => {
    e.preventDefault();
    if (validateEmail(email) && validatePassword(password)) {
      const runRequest = async () => {
        try {
          const res = await createUser(username, email, password, "student");
          if (res.data) {
            if (res.data.messages) {
              message.error(res.data.messages);
            } else {
              message.info("User created");

              //Login and navigate to the correct page
              setUserSession(res.data.jwt, JSON.stringify(res.data.user));

              if (res.data.user.role.name === "Content Creator") {
                navigate("/ccdashboard");
              } else if (res.data.user.role.name === "Researcher") {
                navigate("/report");
              } else if (res.data.user.role.name === "Classroom Manager") {
                navigate("/dashboard");
              } else {
                navigate("/usersettings");
              }
            }
          } else {
            message.error(res.err);
          }
        } catch (err) {
          console.log("Some error happened: " + err);
        }
      };
      await runRequest();
    } else alert("Invalid email or password!");
  };

  return (
    <div className="create-user-page-container">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button className="route-button" onClick={createUserFunction}>
        Create Account
      </button>
    </div>
  );
};

export default CreateUser;
