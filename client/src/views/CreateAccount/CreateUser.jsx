import React, {useState} from 'react'
import "./CreateUserPage.less";
import {createUser, getStudentClassroom} from '../../Utils/requests';
import {message} from "antd";
import {eachLimit} from "../../../public/lib/avrgirl-arduino.global";

const CreateUser = () => {

    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const validateEmail = (emailInput) => { //validates email address
        return String(emailInput)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    const validatePassword = (passwordInput) => {
        if(passwordInput != null){
            return passwordInput;
        }
        else
            return false;
    }

    //handler functions for emails / passwords
    const handleEmailChange = (entry) => {
        setEmail(entry.target.value);
    }

    const handlePasswordChange = (entry) => {
        setPassword(entry.target.value);
    }

    const createUserFunction = async () => {
        if(validateEmail(email) && validatePassword(password)){
            const runRequest = async () => {
                try {
                    const res = await createUser(userId,email,password);
                    if (res.data) {
                        if (res.data.messages) {
                            message.error(res.data.messages)
                        } else {
                            message.info('User created: ' + userId)
                        }
                    } else {
                        message.error(res.err);
                    }
                } catch (err) {console.log('Some error happened: ' + err)}
            };
            await runRequest();


            /*try {
                // Create user here using SQL
                const response = await fetch(''); 
            } catch(error) { //Catch any error and log to the screen
                console.error('Error: ', error); 
            }*/
        }
        else
            alert("Invalid email or password!");
    }

  return (
    <div className='create-user-page-container'>
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
            <button className='route-button' onClick={createUserFunction}>Create Account</button>
        
    </div>
  )

}

export default CreateUser