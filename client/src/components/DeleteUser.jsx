import React, {useState} from 'react'
import 'client/src/index.css'

const DeleteUser = () => {

    const [userId, setUserId] = useState('');

    const deleteUserFunction = async () => {
        try {
            // Delete user here using SQL
            const response = await fetch(''); 
        } catch(error) { //Catch any error and log to the screen
            console.error('Error: ', error); 
        }
    }

  return (
    <div className='delete-container'>
        {   //Check if there is a user ID
            userId ? (
                <button className='delete-button' onClick={deleteUserFunction}>Delete Account</button>
            ) : <p className='delete-error'>Please log in to use this feature</p>
        }
    </div>
  )

}

export default DeleteUser