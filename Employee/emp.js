import { collection, db, getDocs, updateDoc, doc, query, orderBy, where } from '../DB/db.js';

function getCurrentDateFormatted() {
    const now = new Date();
    const day = String(now.getDate());
    const month = String(now.getMonth() + 1);
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
}

window.showDatePicker = function (label) {
    // Find the date picker input within the same row
    const datePicker = label.parentElement.querySelector('.date-picker');
    if (datePicker) {
        // Show the date picker input
        datePicker.style.display = 'block';
        datePicker.focus(); // Focus to open the date picker immediately
    }
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

var selectedDate;
window.updateDate = function (dateInput) {
    const date = new Date(dateInput.value);
    console.log("date =>" + date);
    console.log("in =>" + dateInput.value);
    
    selectedDate = formatDate(date);
    console.log("Se =>" + selectedDate);
    const label = document.getElementById('date');
    if (label) {
        label.textContent = selectedDate;
        loadData();
    }
}

function convertDateFormat(dateString) {
    // Split the input date string by '/'
    var parts = dateString.split('/');

    // Extract month, day, and year
    var month = parts[0].padStart(2, '0'); // Ensure two digits
    var day = parts[1].padStart(2, '0');   // Ensure two digits
    var year = parts[2];

    // Construct the new date string in YYYY-MM-DD format
    var newDateString = `${year}-${month}-${day}`;
    return newDateString;
}

window.onload = async function () {
    loadData();
};

async function loadData() {
    try {
        const tableBody = document.getElementById('table-body');
        document.getElementById('table-body').innerHTML = '';
        const querySnapshot = await getDocs(query(collection(db, 'rows'), orderBy('now')));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const newRow = document.createElement('tr');
            newRow.setAttribute('data-id', doc.id);
            if (doc.data()['date'] === selectedDate) {
                newRow.innerHTML = `
                <td><input type="text" class="cell form-control" value="${data.idPart2 || ''}"></td>
                <td><label class="cell form-control"></label></td>
                <td><label class="cell form-control"></label></td>
                <td><input type="text" class="cell form-control" value="${data.sadaPart2 || ''}"></td>
                <td><label class="cell form-control"></label></td>
                <td><label class="cell form-control"></label></td>
                <td><input type="text" class="cell form-control" value="${data.boteekhPart2 || ''}"></td>
                <td><label class="cell form-control"></label></td>
                <td><label class="cell form-control"></label></td>
                <td><input type="text" class="cell form-control" value="${data.alikaPart2 || ''}"></td>
                <td><label class="cell form-control"></label></td>
                <td><label class="cell form-control"></label></td>
                <td><input type="text" class="cell form-control" value="${data.blueberryPart2 || ''}"></td>
                <td><label class="cell form-control"></label></td>
                <td><label class="cell form-control"></label></td>
                <td><input type="text" class="cell form-control" value="${data.mintGrapesPart2 || ''}"></td>
                <td><label class="cell form-control"></label></td>
                <td><label class="cell form-control"></label></td>
                <td><input type="text" class="cell form-control" value="${data.mintLemonPart2 || ''}"></td>
                <td><label class="cell form-control"></label></td>
                <td><label class="cell form-control"></label></td>
                <td><input type="text" class="cell form-control" value="${data.berryGrapesPart2 || ''}"></td>
                <td><label class="cell form-control"></label></td>
                <td><label class="cell form-control"></label></td>
                <td><input type="text" class="cell form-control" value="${data.mixPart2 || ''}"></td>
                <td><label class="cell form-control"></label></td>
                <td><label class="cell form-control"></label></td>
                <td><input type="text" class="cell form-control" value="${data.palmPart2 || ''}"></td>
                <td><label class="cell form-control"></label></td>
                <td><label class="cell form-control"></label></td>
                <td><input type="text" class="cell form-control" value="${data.premiumPart2 || ''}"></td>
                <td><label class="cell form-control"></label></td>
                <td><label class="cell form-control"></label></td>
                <td colspan="3"><label class="form-control">${data.date}</label></td>
                <td class="action-buttons">
                        <button class="btn btn-save btn-sm" onclick="saveRow(this)">Save</button>
                </td>
                `;
                tableBody.appendChild(newRow);
            }
        });
    } catch (e) {
        console.log("here");
        showAlert(e, 'danger');
    }
}


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


window.saveRow = async function (button) {
    const row = button.closest('tr');
    const docId = row.getAttribute('data-id');
    const inputs = row.querySelectorAll('input');
    const labels = row.querySelectorAll('label');

    const data = {
        idPart2: inputs[0].value,
        sadaPart2: inputs[1].value,
        boteekhPart2: inputs[2].value,
        alikaPart2: inputs[3].value,
        blueberryPart2: inputs[4].value,
        mintGrapesPart2: inputs[5].value,
        mintLemonPart2: inputs[6].value,
        berryGrapesPart2: inputs[7].value,
        mixPart2: inputs[8].value,
        palmPart2: inputs[9].value,
        premiumPart2: inputs[10].value
    };

    try {
        await updateDoc(doc(db, 'rows', docId), data);
        showAlert('Row Updated', 'success');
    } catch (e) {
        showAlert(e, 'danger');
    }
};