import React, { useState } from "react";
import "./CreateUserPage.less";
import { createUser, getStudentClassroom } from "../../Utils/requests";
import { message } from "antd";
import { makeRequest } from '../../Utils/requests.js';
// import {eachLimit} from "../../../public/lib/avrgirl-arduino.global";

const CreateUser = () => {

    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(''); 

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
    }

    const handleUsernameChange = (entry) => {
        setUsername(entry.target.value);
    }

  const handlePasswordChange = (entry) => {
    setPassword(entry.target.value);
  };

  const createUserFunction = async () => {
    if (validateEmail(email) && validatePassword(password)) {
      const runRequest = async () => {
        try {
          console.log("Trying to createUser function"); 
          const res = await createUser(userId, email, password);
          if (res.data) {
            if (res.data.messages) {
              message.error(res.data.messages);
            } else {
              message.info("User created: " + userId);
            }
          } else {
            message.error(res.err);
          }
          console.log("Finished function");
        } catch (err) {
          console.log("Some error happened: " + err);
        }
      };
      await runRequest();

      /*try {
                // Create user here using SQL
                const response = await fetch(''); 
            } catch(error) { //Catch any error and log to the screen
                console.error('Error: ', error); 
            }*/
    } else alert("Invalid email or password!");
  };

  return (
    <div className='create-user-page-container'>
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
            <h2 className="role-drop-title" for="role-names">Choose Role</h2>
            <select name="role-names" id="role-names"
            onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option> 
              <option value="teacher">Teacher</option>
            </select>
            <button className='route-button' onClick={createUserFunction}>Create Account</button>
    </div>
  );
};

export default CreateUser;
