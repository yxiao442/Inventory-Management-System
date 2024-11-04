import React from "react";
import './LoginForm.css'
import { FaUser ,FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = React.useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        setErrorMessage('');
        // Create a data object to send
        const loginData = {
            Username:username,
            Password:password,
            Type:type,
        };

        // Make a POST request to the backend
        try {
            const response = await fetch('http://localhost:18080', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const result = await response.json();

            console.log('Response from backend:', result);

            // Handle success or failure

            if (response.ok) {
                // Handle successful login (e.g., redirect, show a success message)
                console.log('Login successful!');
                navigate('/dashboard');
            } else {
                // const errorText = await response.text();
                // console.error('Error response:', errorText);
                setErrorMessage('Wrong Username or Passwrod');

            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
    const handleChange = (event) => {
        setType(event.target.value);
    };


    return (
       <div className="LoginForm" onSubmit={handleSubmit}>
        <div className='wrapper'>
           <form action="">
               <h1>Login</h1>
               <div className="inputBox">
                   <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                   <FaUser className="icon" />
               </div>
               <div className="inputBox">
                   <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                   <FaLock className="icon" />
               </div>
               <div className="remember">
                   <Box sx={{ minWidth: 80 }}>
                       <FormControl fullWidth>
                           <InputLabel id="demo-simple-select-label">Type</InputLabel>
                           <Select
                               labelId="demo-simple-select-label"
                               id="demo-simple-select"
                               value={type}
                               label="Type"
                               onChange={handleChange}
                           >
                               <MenuItem value={"Manager"}>Manager</MenuItem>
                               <MenuItem value={"Employee"}>Employee</MenuItem>
                           </Select>
                       </FormControl>
                   </Box>
                   <a href="#">Forget Password?</a>
               </div>
               <button type="submit">Login</button>
               <div className="registerLink">
                   <p>Don't have an account? <a href="#">Register</a></p>
               </div>
           </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}


        </div>
       </div>

    );

};

export default LoginForm;