import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AccountManagement() {
  const [location, setLocation] = useState(null);
  const [locationSaved, setLocationSaved] = useState(false);
  const phoneNumber = 'userPhoneNumber'; // Replace with actual user phone number
  const navigate = useNavigate();

  // Fetch saved location from the database on component mount
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-location/${phoneNumber}`);
        if (response.data && response.data.location) {
          setLocation(response.data.location);
          setLocationSaved(true);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };
    fetchLocation();
  }, [phoneNumber]);

  // Save current location to the database if it doesn't exist
  const saveLocation = () => {
    if (!locationSaved && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        try {
          const response = await axios.post('http://localhost:5000/save-location', {
            phoneNumber,
            latitude,
            longitude,
          });
          if (response.status === 201) {
            setLocationSaved(true);
            alert('Location saved successfully');
          } else {
            alert(response.data); // Show "Location already exists" message if applicable
          }
        } catch (error) {
          console.error('Error saving location:', error);
        }
      });
    }
  };

  // Logout and navigate to login screen
  const handleLogout = () => {
    navigate('/login'); // Replace '/login' with your actual login route
  };

  return (
    <div>
      <h2>Account Management</h2>
      
      {locationSaved ? (
        <p>Location already saved: Latitude {location?.latitude}, Longitude {location?.longitude}</p>
      ) : (
        <button onClick={saveLocation}>Save Current Location</button>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AccountManagement;
