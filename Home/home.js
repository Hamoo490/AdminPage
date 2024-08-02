
import { collection, addDoc, db, getDocs, updateDoc, doc, deleteDoc, query, orderBy } from '../DB/db.js';

const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();
let isExistRowUpdate = false;

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
}

document.getElementById("addRow").addEventListener('click', addRow);

window.saveRow = async function (button) {
    const row = button.closest('tr');
    const docId = row.getAttribute('data-id');
    const inputs = row.querySelectorAll('input');
    const labels = row.querySelectorAll('label');
    
    const dataADD = {
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
        date: selectedDate ?? '',
        now: Date()
    };

    const dataEdit = {
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
        date: selectedDate ?? labels[11].textContent,
    };

    try {
        if (docId) {
            isExistRowUpdate = false;
            await updateDoc(doc(db, 'rows', docId), dataEdit);
            showAlert('Row Updated', 'success');
        } else {
            isExistRowUpdate = false;
            await addDoc(collection(db, 'rows'), dataADD);
            showAlert('Row Added', 'success');
        }
    } catch (e) {
        showAlert(e, 'danger');
    } finally { 
        updateSums();
    }
};

function updateSums() {
    const tableBody = document.getElementById('table-body');
    const rows = tableBody.querySelectorAll('tr');
    const sumPart1 = Array(11).fill(0);
    const sumPart2 = Array(11).fill(0);
    const sumPart3 = Array(11).fill(0);

    rows.forEach((row) => {
        const inputs = row.querySelectorAll('input');
        const labels = row.querySelectorAll('label');

        const fieldPrefixes = [
            'idPart', 'sadaPart', 'boteekhPart', 'alikaPart', 'blueberryPart',
            'mintGrapesPart', 'mintLemonPart', 'berryGrapesPart', 'mixPart',
            'palmPart', 'premiumPart'
        ];

        fieldPrefixes.forEach((prefix, index) => {
            const input1 = row.querySelector(`input[name="${prefix}1"]`);
            const input2 = row.querySelector(`input[name="${prefix}2"]`);
            const label = row.querySelector(`label[name="${prefix}3Label"]`);

            if (input1 && input2 && label) {
                sumPart1[index] += Number(input1.value || 0);
                sumPart2[index] += Number(input2.value || 0);
                sumPart3[index] += Number(label.textContent || 0);
            }
        });
    });

    const fieldPrefixes = [
        'idPart', 'sadaPart', 'boteekhPart', 'alikaPart', 'blueberryPart',
        'mintGrapesPart', 'mintLemonPart', 'berryGrapesPart', 'mixPart',
        'palmPart', 'premiumPart'
    ];

    fieldPrefixes.forEach((prefix, index) => {
        const sumPart1Element = document.getElementById(`sumPart1_${prefix}`);
        const sumPart2Element = document.getElementById(`sumPart2_${prefix}`);
        const sumPart3Element = document.getElementById(`sumPart3_${prefix}`);

        if (sumPart1Element) sumPart1Element.textContent = sumPart1[index];
        if (sumPart2Element) sumPart2Element.textContent = sumPart2[index];
        if (sumPart3Element) sumPart3Element.textContent = sumPart3[index];
        if (prefix === 'palmPart') {
            console.log(sumPart1[index]);
            console.log(sumPart2[index]);
            console.log(sumPart3[index]);
        }
        
    });
}

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

const sumPart1 = Array(11).fill(0);
const sumPart2 = Array(11).fill(0);
const sumPart3 = Array(11).fill(0);

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
            fieldPrefixes.forEach((prefix, index) => {
                const input1 = newRow.querySelector(`input[name="${prefix}1"]`);
                const input2 = newRow.querySelector(`input[name="${prefix}2"]`);
                const label = newRow.querySelector(`label[name="${prefix}3Label"]`);

                if (input1 && input2 && label) {
                    input1.addEventListener('input', () => updateRowValues(newRow, prefix));
                    input2.addEventListener('input', () => updateRowValues(newRow, prefix));

                    // Calculate initial value
                    //calculateAndSetFieldValues(label, input1, input2, prefix);
                    updateRowValues(newRow, prefix);

                    sumPart1[index] += Number(input1.value || 0);
                    sumPart2[index] += Number(input2.value || 0);
                    sumPart3[index] += Number(label.textContent || 0);
                } else {
                    console.warn(`Missing input or label fields for ${prefix}`);
                }
            });
            fieldPrefixes.forEach((prefix, index) => {
                const sumPart1Element = document.getElementById(`sumPart1_${prefix}`);
                const sumPart2Element = document.getElementById(`sumPart2_${prefix}`);
                const sumPart3Element = document.getElementById(`sumPart3_${prefix}`);

                if (sumPart1Element) sumPart1Element.textContent = sumPart1[index];
                if (sumPart2Element) sumPart2Element.textContent = sumPart2[index];
                if (sumPart3Element) sumPart3Element.textContent = sumPart3[index];
            });
        });
    } catch (e) {
        showAlert(e, 'danger');
    }
};


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
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    const rowIndex = rows.indexOf(output.closest('tr'));

    const value1 = parseFloat(input1.value) || 0;
    const value2 = parseFloat(input2.value) || 0;

    let previousRowValue = 0;

    if (rowIndex > 0) {
        const previousRow = rows[rowIndex - 1];
        const previousOutputElement = previousRow.querySelector(`label[name="${prefix}3Label"]`);
        if (previousOutputElement) {
            previousRowValue = parseFloat(previousOutputElement.textContent) || 0;
        }
    }

    const newValue = previousRowValue + (value1 - value2);
    output.textContent = newValue;
}

function updateRowValues(row, prefix) {
    const input1 = row.querySelector(`input[name="${prefix}1"]`);
    const input2 = row.querySelector(`input[name="${prefix}2"]`);
    const label = row.querySelector(`label[name="${prefix}3Label"]`);

    if (input1 && input2 && label) {
        // Recalculate the value for the current row
        calculateAndSetFieldValues(label, input1, input2, prefix);

        // Recalculate all subsequent rows
        recalculateSubsequentRows(row, prefix);
    }
}

function recalculateSubsequentRows(startRow, prefix) {
    const tableBody = document.getElementById('table-body');
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    const startIndex = rows.indexOf(startRow);

    for (let i = startIndex + 1; i < rows.length; i++) {
        const row = rows[i];
        const input1 = row.querySelector(`input[name="${prefix}1"]`);
        const input2 = row.querySelector(`input[name="${prefix}2"]`);
        const label = row.querySelector(`label[name="${prefix}3Label"]`);

        if (input1 && input2 && label) {
            // Recalculate the value for each subsequent row
            calculateAndSetFieldValues(label, input1, input2, prefix);
        }
    }
}