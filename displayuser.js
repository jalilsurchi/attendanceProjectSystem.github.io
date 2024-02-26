
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
const firebaseConfig = {
    apiKey: "AIzaSyAoCxJi9rA2J9yPXOBOjnwUigWdq1vy8Rg",
    authDomain: "attendance-d6455.firebaseapp.com",
    projectId: "attendance-d6455",
    storageBucket: "attendance-d6455.appspot.com",
    messagingSenderId: "617649178238",
    appId: "1:617649178238:web:39a158fea4a8eaababba2f",
    measurementId: "G-0QXW7QYSWD"
  };
  
  // Initialize Firebase app
  const app = initializeApp(firebaseConfig);
    const db = getFirestore();
// Get a reference to the container element where you want to display the user data
const userDataContainer = document.getElementById('user-data-container');
// Retrieve data from the Firestore collection named "users"
const getUsersData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        // Clear the container before adding new data
        userDataContainer.innerHTML = '';
        // Loop through the querySnapshot
        querySnapshot.forEach((doc) => {
            // Get the document data
            const userData = doc.data();
            // Create HTML elements to display the user data
            const userDiv = document.createElement('div');
            userDiv.classList.add('user');
            const userDdata = document.createElement('div');
            userDdata.classList.add('user2');
            const useratten = document.createElement('div');
            useratten.classList.add('user1');
            const nameLabel = document.createElement('p');
            nameLabel.textContent = `Name: ${userData.name}`;
            const emailLabel = document.createElement('p');
            emailLabel.textContent = `Email: ${userData.email}`;
            const passwordLabel = document.createElement('p');
            passwordLabel.textContent = `Password: ${userData.password}`;
            const barcodeLabel = document.createElement('p');
            barcodeLabel.textContent = `Barcode: ${userData.barcode}`;
            
            const attendance = document.createElement('p');
            // attendance.textContent = ` ${userData.attendance}`;
            const icon = document.createElement('span');
            icon.style.padding='15px'
            icon.style.borderRadius='10px'
            icon.style.fontSize = '20px'; // Adjust the font size if needed
            icon.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.8)'; // Add a subtle box shadow
            if(userData.attendance === true){
                icon.classList.add('fas', 'fa-check');
                icon.style.color = 'white';
                icon.style.backgroundColor="green"
                attendance.appendChild(icon);
            }
            else{
                icon.classList.add('fas', 'fa-exclamation-circle');             
                icon.style.color = 'white'; // Change the color to red
                icon.style.backgroundColor="red"
                attendance.appendChild(icon);
            }
            // Append the elements to the container
            userDiv.appendChild(userDdata)
            userDdata.appendChild(nameLabel);
            userDdata.appendChild(emailLabel);
            userDdata.appendChild(passwordLabel);
            userDdata.appendChild(barcodeLabel);
            useratten.appendChild(attendance)
            userDiv.appendChild(useratten);
            userDataContainer.appendChild(userDiv);
        });
    } catch (error) {
        console.error('Error retrieving user data: ', error);
        // Provide feedback to the user if there was an error
        alert('An error occurred while retrieving user data. Please try again later.');
    }
};

// Call the function to retrieve and display user data
getUsersData();
