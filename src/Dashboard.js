import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    siteName: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

 
  const phoneNumber = 'userPhoneNumber'; // Replace with the actual phone number of the logged-in user

  // Fetch users from the backend
  useEffect(() => {
    axios.get(`http://localhost:5000/get-data/${phoneNumber}`)
      .then(response => {
        setUsers(response.data.dashboard);
      })
      .catch(error => {
        console.log(error);
      });
  }, [phoneNumber]);

  // Password generation function
  const generatePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    setNewUser({ ...newUser, password });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Create a new user entry
  const handleCreateUser = async () => {
    try {
      await axios.post('http://localhost:5000/add-data', {
        ...newUser,
        phoneNumber,
      });
      setNewUser({ username: '', siteName: '', password: '' });
      const response = await axios.get(`http://localhost:5000/get-data/${phoneNumber}`);
      setUsers(response.data.dashboard);
    } catch (error) {
      console.log(error);
    }
  };

  

 
  return (
    <div>
      <h2>Dashboard</h2>

      {/* User creation form */}
      <div>
        <h3>save a password!</h3>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="text"
          placeholder="Site Name"
          value={newUser.siteName}
          onChange={(e) => setNewUser({ ...newUser, siteName: e.target.value })}
        />

        {/* Password field with eye icon button */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <button 
            onClick={togglePasswordVisibility} 
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <button onClick={generatePassword}>Generate Strong Password</button>
        <button onClick={handleCreateUser}>Save</button>
      </div>

      {/* Display list of users */}
      <div>
        <h3>User List</h3>
        {users.map((user) => (
          <div key={user._id}>
            <p>{user.username} - {user.siteName} - {user.siteName}</p>
          </div>
        ))}
      </div>

      {/* New buttons to trigger saveLocation and verifyOTP */}
      
    </div>
  );
}

export default Dashboard;
