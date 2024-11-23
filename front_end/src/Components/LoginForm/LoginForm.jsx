import React, {useRef, useEffect } from "react";
import './LoginForm.css'
import { FaUser ,FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = React.useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [register, setRegister] = React.useState(false);
    const [newUser,setNewUser] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [newtype, setNewType] = React.useState('');
    const [createSuccess,setSuccess] = useState('');
    const [forget, setForget] = React.useState(false);
    const [forgetName, setForgetUsername] = useState('');
    const [forgetPassword, setForgetPassword] = useState('');
    const [forgetType, setForgetType] = React.useState('');
    const [forgetSuccess,setForgetSuccess] = useState('');
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
                navigate('/dashboard',{ state: { message: type } });
            } else {
                // const errorText = await response.text();
                // console.error('Error response:', errorText);
                setErrorMessage('Wrong Username or Passwrod');

            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
    const handleCreate = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        setSuccess('');
        // Create a data object to send
        const createData = {
            Username:newUser,
            Password:newPassword,
            Type:newtype,
        };
        // Make a POST request to the backend
        try {
            const response = await fetch('http://localhost:18080/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createData),
            });

            const result = await response.json();

            console.log('Response from backend:', result);

            // Handle success or failure

            if (response.ok) {
                // Handle successful login (e.g., redirect, show a success message)
                console.log('Create successful!');
                setSuccess("Create successful!")

            } else {

                setSuccess('Username exist');

            }
        } catch (error) {
            console.error('Error during create user:', error);
        }
    };
    const handleForget = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        setForgetSuccess('');
        // Create a data object to send
        const forgetData = {
            Username:forgetName,
            Password:forgetPassword,
            Type:forgetType,
        };
        // Make a POST request to the backend
        try {
            const response = await fetch('http://localhost:18080/forgetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(forgetData),
            });

            const result = await response.json();

            console.log('Response from backend:', result);

            // Handle success or failure

            if (response.ok) {
                // Handle successful login (e.g., redirect, show a success message)
                console.log('Password reset successful!');
                setForgetSuccess("Password reset successful!")

            } else {

                setForgetSuccess('Username does not exist');

            }
        } catch (error) {
            console.error('Error during create user:', error);
        }
    };
    const handleRegister = (event) =>{
        event.preventDefault();
        setRegister(true);

    };
    const handleForgetOpen = (event) =>{
        event.preventDefault();
        setForget(true);

    };
    const handleClose = () => {

        setRegister(false);
        setNewUser('')
        setNewPassword('')
        setNewType('')
        setSuccess('')

    };
    const handleForgetClose= () => {
        setForget(false);
        setForgetUsername('')
        setForgetPassword('')
        setForgetType('')
        setForgetSuccess('')

    };
    const handleChange = (event) => {
        setType(event.target.value);
    };
    const handleChangeNew = (event) => {
        setNewType(event.target.value);
    };
    const handleChangeForget = (event) => {
        setForgetType(event.target.value);
    };

    return (
        <div>
        <div id="root" >
       <div className="LoginForm" >
        <div className='wrapper'>
           <form onSubmit={handleSubmit}>
               <h1>Login</h1>
               <div className="inputBox">
                   <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required/>
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

                   <a href="#!" onClick={handleForgetOpen}>Forget Password?</a>
               </div>
               <button type="submit">Login</button>

               <div className="registerLink" >
                   <p>Don't have an account? <a href="#!" onClick={handleRegister}>Register</a></p>

               </div>

           </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
            <div>
                <Dialog
                    open={register}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="sm"
                    fullWidth
                    keepMounted = {false}
                    PaperProps={{
                        style:{
                            height :'330px'
                        },
                    }}

                >
                    <DialogTitle id="alert-dialog-title">
                        {"Creat an account"}
                    </DialogTitle>
                    <DialogContent>
                        {/*<DialogContentText id="alert-dialog-description">*/}
                        {/*    Let Google help apps determine location. This means sending anonymous*/}
                        {/*    location data to Google, even when no apps are running.*/}
                        {/*</DialogContentText>*/}
                        <form onSubmit={handleCreate}>
                            <div>
                                <input className="styled-input" type="text" placeholder="Username" value={newUser} onChange={(e) => setNewUser(e.target.value)} required/>

                            </div>
                            <div >
                                <input className="styled-input" type="password"  placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>

                            </div>
                            <div >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={newtype}
                                        label="Type"
                                        onChange={handleChangeNew}
                                    >
                                        <MenuItem value={"Manager"}>Manager</MenuItem>
                                        <MenuItem value={"Employee"}>Employee</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <Button  type="submit">Create</Button>
                            {createSuccess && <p style={{ color: 'red' }}>{createSuccess}</p>} {/* Display error message */}

                        </form>
                    </DialogContent>
                    <DialogActions>


                    </DialogActions>
                </Dialog>

            </div>

            <div >
                <Dialog
                    open={forget}
                    onClose={handleForgetClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="sm"
                    fullWidth
                    keepMounted = {false}
                    PaperProps={{
                        style:{
                            height :'330px'
                        },
                    }}

                >
                    <DialogTitle id="alert-dialog-title">
                        {"Reset Password"}
                    </DialogTitle>
                    <DialogContent>

                        <form onSubmit={handleForget}>
                            <div>
                                <input className="styled-input" type="text" placeholder="Username" value={forgetName} onChange={(e) => setForgetUsername(e.target.value)} required/>

                            </div>
                            <div >
                                <input className="styled-input" type="password"  placeholder="Password" value={forgetPassword} onChange={(e) => setForgetPassword(e.target.value)} required/>

                            </div>
                            <div >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={forgetType}
                                        label="Type"
                                        onChange={handleChangeForget}
                                    >
                                        <MenuItem value={"Manager"}>Manager</MenuItem>
                                        <MenuItem value={"Employee"}>Employee</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <Button  type="submit">Reset</Button>
                            {forgetSuccess && <p style={{ color: 'red' }}>{forgetSuccess}</p>} {/* Display error message */}

                        </form>
                    </DialogContent>
                    <DialogActions>


                    </DialogActions>
                </Dialog>

            </div>
        </div>
       </div>
      </div>



        </div>

    );

};

export default LoginForm;