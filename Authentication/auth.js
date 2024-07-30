import { collection, db, getDocs } from '../DB/db.js';


var adminEmail;
var adminPassword;
var empEmail;
var empPassword;

async function getEmails() {
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (doc.id == "1") {
            adminEmail = data['email'];
            adminPassword = data['password'];
        }
        if (doc.id == "2") {
            empEmail = data['email'];
            empPassword = data['password'];
        }
    });
}

getEmails();

function login(em, pa) {
    if (em == adminEmail && pa == adminPassword) {
        window.location.href = '../Home/home.html';
    }
    else if (em == empEmail && pa == empPassword) {
        window.location.href = '../Employee/index.html';
    }
    else {
        showAlert("Email OR Password Not Correct", 'danger');
    }
}

document.getElementById("auth-button").addEventListener('click', function () { 
    var e = document.getElementById("email").value;
    var p = document.getElementById("password").value;
    login(e, p);
});

function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.role = 'alert';
    alertDiv.innerText = message;
    alertContainer.appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}