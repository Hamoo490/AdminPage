
import { collection, addDoc, db, getDocs, updateDoc, doc, deleteDoc, query, orderBy } from '../DB/db.js';

const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();
let isExistRowUpdate = false;
let sumPart1 = 0.0, sumPart2 = 0.0, sumPart3 = 0.0;

function addRow() {
    
    if (isExistRowUpdate == true) { 
        showAlert("Save The Row Updated", 'danger');
        return;
    }
    const tableBody = document.getElementById('table-body');
    const newRow = document.createElement('tr');   
    newRow.innerHTML = `
        <td><input type="text" class="cell form-control" name="idPart1"></td>
        <td><input type="text" class="cell form-control part2Label" name="idPart2"></td>
        <td><label class="form-control part3Label" name="idPart3Label"></label></td>
        <td><input type="text" class="cell form-control" name="sadaPart1"></td>
        <td><input type="text" class="cell form-control part2Label" name="sadaPart2"></td>
        <td><label class="form-control part3Label" name="sadaPart3Label"></label></td>
        <td><input type="text" class="cell form-control" name="boteekhPart1"></td>
        <td><input type="text" class="cell form-control part2Label" name="boteekhPart2"></td>
        <td><label class="form-control part3Label" name="boteekhPart3Label"></label></td>
        <td><input type="text" class="cell form-control" name="alikaPart1"></td>
        <td><input type="text" class="cell form-control part2Label" name="alikaPart2"></td>
        <td><label class="form-control part3Label" name="alikaPart3Label"></label></td>
        <td><input type="text" class="cell form-control" name="blueberryPart1"></td>
        <td><input type="text" class="cell form-control part2Label" name="blueberryPart2"></td>
        <td><label class="form-control part3Label" name="blueberryPart3Label"></label></td>
        <td><input type="text" class="cell form-control" name="mintGrapesPart1"></td>
        <td><input type="text" class="cell form-control part2Label" name="mintGrapesPart2"></td>
        <td><label class="form-control part3Label" name="mintGrapesPart3Label"></label></td>
        <td><input type="text" class="cell form-control" name="mintLemonPart1"></td>
        <td><input type="text" class="cell form-control part2Label" name="mintLemonPart2"></td>
        <td><label class="form-control part3Label" name="mintLemonPart3Label"></label></td>
        <td><input type="text" class="cell form-control" name="berryGrapesPart1"></td>
        <td><input type="text" class="cell form-control part2Label" name="berryGrapesPart2"></td>
        <td><label class="form-control part3Label" name="berryGrapesPart3Label"></label></td>
        <td><input type="text" class="cell form-control" name="mixPart1"></td>
        <td><input type="text" class="cell form-control part2Label" name="mixPart2"></td>
        <td><label class="form-control part3Label" name="mixPart3Label"></label></td>
        <td><input type="text" class="cell form-control" name="palmPart1"></td>
        <td><input type="text" class="cell form-control part2Label" name="palmPart2"></td>
        <td><label class="form-control part3Label" name="palmPart3Label"></label></td>
        <td><input type="text" class="cell form-control" name="premiumPart1"></td>
        <td><input type="text" class="cell form-control part2Label" name="premiumPart2"></td>
        <td><label class="form-control part3Label" name="premiumPart3Label"></label></td>
        <td colspan="3">
            <label class="form-control date-label" name="date" onclick="showDatePicker(this)">select date</label>
            <input type="date" class="date-picker date-label" style="display:none;" onchange="updateDate(this)">
        </td>
        <td class="action-buttons" colspan="3">
            <button class="btn btn-save btn-sm" onclick="saveRow(this)">Save</button>
            <button class="btn btn-danger btn-sm" onclick="deleteRow(this)">Delete</button>
        </td>
        `;

    tableBody.appendChild(newRow);
    const fieldPrefixes = [
        'idPart', 'sadaPart', 'boteekhPart', 'alikaPart', 'blueberryPart',
        'mintGrapesPart', 'mintLemonPart', 'berryGrapesPart', 'mixPart',
        'palmPart', 'premiumPart'
    ];
    isExistRowUpdate = true;
    // Attach event listeners to all relevant fields
    fieldPrefixes.forEach(prefix => {
        const input1 = newRow.querySelector(`input[name="${prefix}1"]`);
        const input2 = newRow.querySelector(`input[name="${prefix}2"]`);
        const output = newRow.querySelector(`label[name="${prefix}3Label"]`);

        if (input1 && input2 && output) {
            input1.addEventListener('input', () => calculateAndSetFieldValues(output, input1, input2, prefix));
            input2.addEventListener('input', () => calculateAndSetFieldValues(output, input1, input2, prefix));

            calculateAndSetFieldValues(output, input1, input2, prefix);
        }
    });
    sumPart1 += Number(data.idPart1 || 0) + Number(data.sadaPart1 || 0) + Number(data.boteekhPart1 || 0) +
        Number(data.alikaPart1 || 0) + Number(data.blueberryPart1 || 0) + Number(data.mintGrapesPart1 || 0) +
        Number(data.mintLemonPart1 || 0) + Number(data.berryGrapesPart1 || 0) + Number(data.mixPart1 || 0) +
        Number(data.palmPart1 || 0) + Number(data.premiumPart1 || 0);

    sumPart2 += Number(data.idPart2 || 0) + Number(data.sadaPart2 || 0) + Number(data.boteekhPart2 || 0) +
        Number(data.alikaPart2 || 0) + Number(data.blueberryPart2 || 0) + Number(data.mintGrapesPart2 || 0) +
        Number(data.mintLemonPart2 || 0) + Number(data.berryGrapesPart2 || 0) + Number(data.mixPart2 || 0) +
        Number(data.palmPart2 || 0) + Number(data.premiumPart2 || 0);

    sumPart3 += Number(data.idPart3 || 0) + Number(data.sadaPart3 || 0) + Number(data.boteekhPart3 || 0) +
        Number(data.alikaPart3 || 0) + Number(data.blueberryPart3 || 0) + Number(data.mintGrapesPart3 || 0) +
        Number(data.mintLemonPart3 || 0) + Number(data.berryGrapesPart3 || 0) + Number(data.mixPart3 || 0) +
        Number(data.palmPart3 || 0) + Number(data.premiumPart3 || 0);
}

document.getElementById("addRow").addEventListener('click', addRow);

window.saveRow = async function (button) {
    const row = button.closest('tr');
    const docId = row.getAttribute('data-id');
    const inputs = row.querySelectorAll('input');
    const labels = row.querySelectorAll('label');
    
    const data = {
        idPart1: inputs[0].value,
        idPart2: inputs[1].value,
        idPart3: labels[0].textContent,
        sadaPart1: inputs[2].value,
        sadaPart2: inputs[3].value,
        sadaPart3: labels[1].textContent,
        boteekhPart1: inputs[4].value,
        boteekhPart2: inputs[5].value,
        boteekhPart3: labels[2].textContent,
        alikaPart1: inputs[6].value,
        alikaPart2: inputs[7].value,
        alikaPart3: labels[3].textContent,
        blueberryPart1: inputs[8].value,
        blueberryPart2: inputs[9].value,
        blueberryPart3: labels[4].textContent,
        mintGrapesPart1: inputs[10].value,
        mintGrapesPart2: inputs[11].value,
        mintGrapesPart3: labels[5].textContent,
        mintLemonPart1: inputs[12].value,
        mintLemonPart2: inputs[13].value,
        mintLemonPart3: labels[6].textContent,
        berryGrapesPart1: inputs[14].value,
        berryGrapesPart2: inputs[15].value,
        berryGrapesPart3: labels[7].textContent,
        mixPart1: inputs[16].value,
        mixPart2: inputs[17].value,
        mixPart3: labels[8].textContent,
        palmPart1: inputs[18].value,
        palmPart2: inputs[19].value,
        palmPart3: labels[9].textContent,
        premiumPart1: inputs[20].value,
        premiumPart2: inputs[21].value,
        premiumPart3: labels[10].textContent,
        date: selectedDate,
        now: Date()
    };

    try {
        if (docId) {
            isExistRowUpdate = false;
            await updateDoc(doc(db, 'rows', docId), data);
            showAlert('Row Updated', 'success');
        } else {
            isExistRowUpdate = false;
            await addDoc(collection(db, 'rows'), data);
            showAlert('Row Added', 'success');
        }
    } catch (e) {
        showAlert(e, 'danger');
    } finally { 
        updateSums();
    }
};

window.deleteRow = async function (button) {
    const row = button.closest('tr');
    const tableBody = document.getElementById('table-body');
    tableBody.removeChild(row);
    isExistRowUpdate = false;
    const docId = row.getAttribute('data-id');
    if (docId) {
        try {
            await deleteDoc(doc(db, 'rows', docId));
            showAlert('Row Deleted', 'success');
        } catch (e) {
            showAlert(e, 'danger');
        }
    }
};

window.loadData = async function () {
    try {
        const tableBody = document.getElementById('table-body');
        const querySnapshot = await getDocs(query(collection(db, 'rows'), orderBy('now')));
        isExistRowUpdate = false;
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const newRow = document.createElement('tr');
            newRow.setAttribute('data-id', doc.id);

        
            newRow.innerHTML = `
            <td><input type="text" class="cell form-control" name="idPart1" value="${data.idPart1 || ''}"></td>
            <td><input type="text" class="cell form-control part2Label" name="idPart2" value="${data.idPart2 || ''}"></td>
            <td><label class="form-control part3Label" name="idPart3Label">${data.idPart3 || ''}</label></td>
            <td><input type="text" class="cell form-control" name="sadaPart1" value="${data.sadaPart1 || ''}"></td>
            <td><input type="text" class="cell form-control part2Label" name="sadaPart2" value="${data.sadaPart2 || ''}"></td>
            <td><label class="form-control part3Label" name="sadaPart3Label">${data.sadaPart3 || ''}</label></td>
            <td><input type="text" class="cell form-control" name="boteekhPart1" value="${data.boteekhPart1 || ''}"></td>
            <td><input type="text" class="cell form-control part2Label" name="boteekhPart2" value="${data.boteekhPart2 || ''}"></td>
            <td><label class="form-control part3Label" name="boteekhPart3Label">${data.boteekhPart3 || ''}</label></td>
            <td><input type="text" class="cell form-control" name="alikaPart1" value="${data.alikaPart1 || ''}"></td>
            <td><input type="text" class="cell form-control part2Label" name="alikaPart2" value="${data.alikaPart2 || ''}"></td>
            <td><label class="form-control part3Label" name="alikaPart3Label">${data.alikaPart3 || ''}</label></td>
            <td><input type="text" class="cell form-control" name="blueberryPart1" value="${data.blueberryPart1 || ''}"></td>
            <td><input type="text" class="cell form-control part2Label" name="blueberryPart2" value="${data.blueberryPart2 || ''}"></td>
            <td><label class="form-control part3Label" name="blueberryPart3Label">${data.blueberryPart3 || ''}</label></td>
            <td><input type="text" class="cell form-control" name="mintGrapesPart1" value="${data.mintGrapesPart1 || ''}"></td>
            <td><input type="text" class="cell form-control part2Label" name="mintGrapesPart2" value="${data.mintGrapesPart2 || ''}"></td>
            <td><label class="form-control part3Label" name="mintGrapesPart3Label">${data.mintGrapesPart3 || ''}</label></td>
            <td><input type="text" class="cell form-control" name="mintLemonPart1" value="${data.mintLemonPart1 || ''}"></td>
            <td><input type="text" class="cell form-control part2Label" name="mintLemonPart2" value="${data.mintLemonPart2 || ''}"></td>
            <td><label class="form-control part3Label" name="mintLemonPart3Label">${data.mintLemonPart3 || ''}</label></td>
            <td><input type="text" class="cell form-control" name="berryGrapesPart1" value="${data.berryGrapesPart1 || ''}"></td>
            <td><input type="text" class="cell form-control part2Label" name="berryGrapesPart2" value="${data.berryGrapesPart2 || ''}"></td>
            <td><label class="form-control part3Label" name="berryGrapesPart3Label">${data.berryGrapesPart3 || ''}</label></td>
            <td><input type="text" class="cell form-control" name="mixPart1" value="${data.mixPart1 || ''}"></td>
            <td><input type="text" class="cell form-control part2Label" name="mixPart2" value="${data.mixPart2 || ''}"></td>
            <td><label class="form-control part3Label" name="mixPart3Label">${data.mixPart3 || ''}</label></td>
            <td><input type="text" class="cell form-control" name="palmPart1" value="${data.palmPart1 || ''}"></td>
            <td><input type="text" class="cell form-control part2Label" name="palmPart2" value="${data.palmPart2 || ''}"></td>
            <td><label class="form-control part3Label" name="palmPart3Label">${data.palmPart3 || ''}</label></td>
            <td><input type="text" class="cell form-control" name="premiumPart1" value="${data.premiumPart1 || ''}"></td>
            <td><input type="text" class="cell form-control part2Label" name="premiumPart2" value="${data.premiumPart2 || ''}"></td>
            <td><label class="form-control part3Label" name="premiumPart3Label">${data.premiumPart3 || ''}</label></td>
            <td colspan="3">
                <label class="form-control date-label" name="date" onclick="showDatePicker(this)">${data.date || 'Click to select date'}</label>
                <input type="date" class="date-picker date-label" style="display:none;" onchange="updateDate(this)">
            </td>
            <td class="action-buttons">
                <button class="btn btn-save btn-sm" onclick="saveRow(this)">Save</button>
                <button class="btn btn-danger btn-sm" onclick="deleteRow(this)">Delete</button>
            </td>
        `;



            tableBody.appendChild(newRow);

            const fieldPrefixes = [
                'idPart', 'sadaPart', 'boteekhPart', 'alikaPart', 'blueberryPart',
                'mintGrapesPart', 'mintLemonPart', 'berryGrapesPart', 'mixPart',
                'palmPart', 'premiumPart'
            ];

            // Attach event listeners to all relevant fields
            fieldPrefixes.forEach(prefix => {
                const input1 = newRow.querySelector(`input[name="${prefix}1"]`);
                const input2 = newRow.querySelector(`input[name="${prefix}2"]`);
                const label = newRow.querySelector(`label[name="${prefix}3Label"]`);

                if (input1 && input2 && label) {
                    input1.addEventListener('input', () => calculateAndSetFieldValues(label, input1, input2, prefix));
                    input2.addEventListener('input', () => calculateAndSetFieldValues(label, input1, input2, prefix));

                    // Calculate initial value
                    calculateAndSetFieldValues(label, input1, input2, prefix);
                } else {
                    console.warn(`Missing input or label fields for ${prefix}`);
                }
            });
            updateSums();
        });
    } catch (e) {
        showAlert(e, 'danger');
    }
};

function updateSums() {
    const fieldPrefixes = [
        'idPart', 'sadaPart', 'boteekhPart', 'alikaPart', 'blueberryPart',
        'mintGrapesPart', 'mintLemonPart', 'berryGrapesPart', 'mixPart',
        'palmPart', 'premiumPart'
    ];

    let sumPart1 = 0, sumPart2 = 0, sumPart3 = 0;

    document.querySelectorAll('#table-body tr').forEach(row => {
        fieldPrefixes.forEach(prefix => {
            const input1 = row.querySelector(`input[name="${prefix}1"]`);
            const input2 = row.querySelector(`input[name="${prefix}2"]`);
            const label = row.querySelector(`label[name="${prefix}3Label"]`);

            if (input1) sumPart1 += parseFloat(input1.value) || 0;
            if (input2) sumPart2 += parseFloat(input2.value) || 0;
            if (label) sumPart3 += parseFloat(label.textContent) || 0;
        });
    });

    displaySums(sumPart1, sumPart2, sumPart3);
}

function displaySums(sumPart1, sumPart2, sumPart3) {
    document.getElementById('sumPart1').textContent = sumPart1.toFixed(2);
    document.getElementById('sumPart2').textContent = sumPart2.toFixed(2);
    document.getElementById('sumPart3').textContent = sumPart3.toFixed(2);
}

window.showDatePicker = function (label) {
    isExistRowUpdate = true;
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
    isExistRowUpdate = true;
    const date = new Date(dateInput.value);
    selectedDate = formatDate(date);
    const label = dateInput.parentElement.querySelector('[name="date"]');
    if (label) {
        // Update the label with the selected date
        label.textContent = selectedDate;
    }
    // Hide the date picker input after selection
    dateInput.style.display = 'none';
}

window.onload = async function () {
    loadData();
};

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

function calculateAndSetFieldValues(output, input1, input2, prefix) {
    const tableBody = document.getElementById('table-body');
    const lastRow = tableBody.querySelectorAll('tr')[tableBody.rows.length - 2];
    const value1 = parseFloat(input1.value) || 0;
    const value2 = parseFloat(input2.value) || 0;
    let lastOutputValue = 0;

    if (lastRow) {
        const lastOutputElement = lastRow.querySelector(`label[name="${prefix}3Label"]`);
        if (lastOutputElement) {
            lastOutputValue = parseFloat(lastOutputElement.textContent) || 0;
        }
    }

    const newValue = lastOutputValue + (value1 - value2);
    output.textContent = newValue;
}
