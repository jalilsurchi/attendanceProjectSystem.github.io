import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { addDoc, collection, getDocs, getFirestore, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyAoCxJi9rA2J9yPXOBOjnwUigWdq1vy8Rg",
  authDomain: "attendance-d6455.firebaseapp.com",
  projectId: "attendance-d6455",
  storageBucket: "attendance-d6455.appspot.com",
  messagingSenderId: "617649178238",
  appId: "1:617649178238:web:39a158fea4a8eaababba2f",
  measurementId: "G-0QXW7QYSWD"
};


var barcode;
// Initialize Firebase app
const app = initializeApp(firebaseConfig);
 const db = getFirestore();
// Get a reference to the form
const registerForm = document.getElementById('register-form');
const barcodeDiv=document.getElementById('barcode')
// Listen for the form submission event
registerForm.addEventListener('submit', async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Get the input values from the form
    const name = registerForm.querySelector('#name').value;
    const email = registerForm.querySelector('#email').value;
    const password = registerForm.querySelector('#password').value;
    const confirmPassword = registerForm.querySelector('#confirm-password').value;
    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    try {
    let isUniqueBarcode = false;
      // Generate a unique 7-digit barcode
    while (!isUniqueBarcode) {
          // Generate a random 7-digit number for the barcode
          barcode = Math.floor(1000000 + Math.random() * 9000000);
          // Check if the barcode is already in use
          const querySnapshot = await getDocs(query(collection(db, 'users'), where('barcode', '==', barcode)));
          if (querySnapshot.empty) {
              // Barcode is unique
              isUniqueBarcode = true;}}
        // Add a new document with a generated ID to the "users" collection
        await addDoc(collection(db, 'users'), {
            name: name,
            email: email,
            password: password,
            barcode: barcode,
            attendance:false
        });
        // Clear the form after successful submission
        const nameElement = document.createElement('h3');
        nameElement.textContent ="your barcode is: " + barcode;
        nameElement.classList.add('item-name');
barcodeDiv.appendChild(nameElement);
        console.log('#barcode', barcode);        // Provide feedback to the user
        alert('Registration successful!');
    } catch (error) {
    console.error('Error during registration: ', error);
      // Provide more detailed error feedback to the user
    if (error.code === 'permission-denied') {
        alert('Error: Permission denied. Please check your Firebase security rules.');
    } else {
        alert('An unknown error occurred while registering. Please try again later.');
    }
}
});
function reset(){
        registerForm.reset();
        barcodeDiv.innerHTML=''
}document.getElementById('resbtn').addEventListener('click', reset);






