import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { addDoc, collection, getDocs,updateDoc, getFirestore, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyAoCxJi9rA2J9yPXOBOjnwUigWdq1vy8Rg",
    authDomain: "attendance-d6455.firebaseapp.com",
    projectId: "attendance-d6455",
    storageBucket: "attendance-d6455.appspot.com",
    messagingSenderId: "617649178238",
    appId: "1:617649178238:web:39a158fea4a8eaababba2f",
    measurementId: "G-0QXW7QYSWD"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
async function getUserInfo(inputName) {
    try {
        // Reference to the "users" collection
        const usersRef = collection(db, 'users');
        // Query Firestore for the user with the provided name
        const q = query(usersRef, where('barcode', '==', inputName));
        const querySnapshot = await getDocs(q);
        // Check if any documents were found
        if (!querySnapshot.empty) {
            // User exists
            const userData = [];
            querySnapshot.forEach((doc) => {
                // Push user data to the array
                userData.push(doc.data());
            });
            return userData; // Return array of user data
        } else {
            // User does not exist
            return null; // Return null if user does not exist
        }
    } catch (error) {
        console.error("Error getting user info:", error);
        // Handle error appropriately (e.g., show error message to user)
        return null; // Return null in case of error
    }
}
// Function to handle button click event
function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const inputName = parseInt(document.getElementById("enterbarcode").value, 10); // Convert input value to integer
    getUserInfo(inputName).then((userData) => {
        if (userData) {
            userData.forEach((user) => {
                // console.log("User data:", inputName, user.attendance);
                
                // Toggle user attendance
                const newAttendance = !user.attendance; // Toggle the value of attendance
                
                // Update user attendance
                updateUserAttendance(inputName, newAttendance);
            });
        } else {
            console.log("User does not exist!");
            // Do something if user does not exist
        }});}
// Function to update user attendance in Firestore
async function updateUserAttendance(inputName, attendance) {
    try {
        // Reference to the "users" collection
        const usersRef = collection(db, 'users');
        // Query Firestore for the user with the provided name
        const q = query(usersRef, where('barcode', '==', inputName));
        const querySnapshot = await getDocs(q);
        // Update user attendance
        querySnapshot.forEach((doc) => {
            updateDoc(doc.ref, { attendance: attendance });
            const message = document.getElementById("message");
            const currentAttendance = document.createElement('p');
            const inputnameeelement = document.createElement('p');
            const icon = document.createElement('span');
            icon.style.padding='15px'
            icon.style.borderRadius='10px'
            icon.style.fontSize = '20px'; // Adjust the font size if needed
            icon.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.8)'; // Add a subtle box shadow
            inputnameeelement.textContent = `barcode: ${inputName}`;
            if(attendance === true){
                icon.classList.add('fas', 'fa-check');
                icon.style.color = 'white';
                icon.style.backgroundColor="green"
            currentAttendance.appendChild(icon);
            }
            else{
                icon.classList.add('fas', 'fa-times');                currentAttendance.style.color='red';
                icon.style.color = 'white'; // Change the color to red
                icon.style.backgroundColor="red"
                currentAttendance.appendChild(icon);
            }
            message.appendChild(inputnameeelement);
            message.appendChild(currentAttendance);
        });
    } catch (error) {
        console.error("Error updating user attendance:", error);
        // Handle error appropriately (e.g., show error message to user)
    }
}
// Add event listener to the submit button
document.getElementById('submit').addEventListener('click', handleSubmit);
// Add event listener to the reset button
document.getElementById('reset').addEventListener('click', function() {
    location.reload(); // Reload the page
});





// function homeReg(){

//  const regdiv= document.getElementById('registration')
// const password=document.createElement('input')
// const button=document.createElement('button')

// regdiv.appendChild(password)
// regdiv.appendChild(button)
// }
// document.getElementById("buttonreg").addEventListener('click',homeReg)


function homeReg(){
    const homediv=document.getElementById('homeregisterdiv')
    const password=document.createElement('input')
    const button=document.createElement('button')
    button.textContent="go";
    password.placeholder="enter password"
    password.style.height="35px"
    password.style.marginRight="10px"
    password.type = "password";
    button.id="passbutton";
    password.id="passinput";
    homediv.appendChild(password)
    homediv.appendChild(button)
    
    document.getElementById('passbutton').addEventListener('click', gotohome)
    
    }
    document.getElementById('homedir').addEventListener('click', homeReg)
    
    
    
    
    function gotohome(){
    const passinput=document.getElementById("passinput").value
    // alert(passinput)
    
    if(passinput=="adminadmin"){
        window.location.href = "users.html";
    }else{
        alert("wrong password")
        window.location.href = "index.html";
    
    }
    }
    
    
    
    
    
    function regdir(){
    const homediv=document.getElementById('homeregisterdiv')
    const password=document.createElement('input')
    const button=document.createElement('button')
    button.textContent="go";
    password.placeholder="enter password"
    password.style.height="35px"
    password.style.marginRight="10px"
    password.type = "password";
    button.id="passbutton";
    password.id="passinput";
    homediv.appendChild(password)
    homediv.appendChild(button)
    
    document.getElementById('passbutton').addEventListener('click', gotoreg)
    
    }
    document.getElementById('regdir').addEventListener('click', regdir)
    
    
    
    
    function gotoreg(){
    const passinput=document.getElementById("passinput").value
    // alert(passinput)
    
    if(passinput=="adminadmin"){
        window.location.href = "register.html";
    }else{
        alert("wrong password")
        window.location.href = "index.html";
    
    }
    }