import React, { useState } from "react";
import "./CreateUserPage.less";
import { createUser, getStudentClassroom } from "../../Utils/requests";
import { message } from "antd";
import { makeRequest } from "../../Utils/requests.js";
import { setUserSession } from "../../Utils/AuthRequests";
import { useNavigate } from "react-router-dom";
// import {eachLimit} from "../../../public/lib/avrgirl-arduino.global";

const CreateUser = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTemp, setPasswordTemp] = useState(""); 
  const [role, setRole] = useState("Student");
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
    return String(passwordInput)
      .match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      );
  };

  const validateUsername = (usernameInput) => {
    if(usernameInput != null){
      return usernameInput;
    }
    else
      return false;
  }

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

  const handleTempPasswordChange = (entry) => {
    setPasswordTemp(entry.target.value);
  };

  const createUserFunction = async (e) => {
    e.preventDefault();
    if (validateEmail(email) && validatePassword(password) && validateUsername(username)) {
      if(password !== passwordTemp){
        message.error("Please ensure that passwords match.");
        return; 
      }
      const runRequest = async () => {
        try {
          const res = await createUser(username, email, password, role);
          if (res.data) {
            if (res.data.messages) {
              message.error(res.data.messages);
            } else {
              message.info("User created");

              //Login and navigate to the correct page
              setUserSession(res.data.jwt, JSON.stringify(res.data.user));
              console.log(res.data.user);

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
    }
    else if(validateEmail(email) && !validatePassword(password) && validateUsername(username)){
      message.error("Invalid password!");
    }
    else if(validatePassword(password) && !validateEmail(email) && validateUsername(username)){
      message.error("Invalid email!");
    }
    else if(validateUsername(username) && !validateEmail(email) && !validatePassword(password))
      message.error("Invalid email and password!");
    else if(!validateUsername(username) && validateEmail(email) && validatePassword(password)){
      message.error("Invalid username!");
    }
    else if(!validateUsername(username) && !validateEmail(email) && validatePassword(password)){
      message.error("Invalid username and email!");
    }
    else if(!validateUsername(username) && validateEmail(email) && !validatePassword(password)){
      message.error("Invalid username and password!");
    }
    else
      message.error("Invalid username, email, and password!");
    return;
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
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={passwordTemp}
        onChange={handleTempPasswordChange}
      />
      <h2 className="role-drop-title" htmlFor="role-names">
        Choose Role
      </h2>
      <select
        name="role-names"
        id="role-names"
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <button className="route-button" onClick={createUserFunction}>
        Create Account
      </button>
    </div>
  );
};

export default CreateUser;
