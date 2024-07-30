
import { collection, addDoc, db, getDocs, updateDoc, doc, deleteDoc, query, orderBy } from '../DB/db.js';

const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();
const formattedDate = `${day}/${month}/${year}`;

function addRow() {
    const tableBody = document.getElementById('table-body');
    const newRow = document.createElement('tr');   
    newRow.innerHTML = `
    <td><input type="text" class="cell form-control" name="idPart1"></td>
    <td><input type="text" class="cell form-control" name="idPart2"></td>
    <td><input type="text" class="cell form-control" name="idPart3"></td>
    <td><input type="text" class="cell form-control" name="sadaPart1"></td>
    <td><input type="text" class="cell form-control" name="sadaPart2"></td>
    <td><input type="text" class="cell form-control" name="sadaPart3"></td>
    <td><input type="text" class="cell form-control" name="boteekhPart1"></td>
    <td><input type="text" class="cell form-control" name="boteekhPart2"></td>
    <td><input type="text" class="cell form-control" name="boteekhPart3"></td>
    <td><input type="text" class="cell form-control" name="alikaPart1"></td>
    <td><input type="text" class="cell form-control" name="alikaPart2"></td>
    <td><input type="text" class="cell form-control" name="alikaPart3"></td>
    <td><input type="text" class="cell form-control" name="blueberryPart1"></td>
    <td><input type="text" class="cell form-control" name="blueberryPart2"></td>
    <td><input type="text" class="cell form-control" name="blueberryPart3"></td>
    <td><input type="text" class="cell form-control" name="mintGrapesPart1"></td>
    <td><input type="text" class="cell form-control" name="mintGrapesPart2"></td>
    <td><input type="text" class="cell form-control" name="mintGrapesPart3"></td>
    <td><input type="text" class="cell form-control" name="mintLemonPart1"></td>
    <td><input type="text" class="cell form-control" name="mintLemonPart2"></td>
    <td><input type="text" class="cell form-control" name="mintLemonPart3"></td>
    <td><input type="text" class="cell form-control" name="berryGrapesPart1"></td>
    <td><input type="text" class="cell form-control" name="berryGrapesPart2"></td>
    <td><input type="text" class="cell form-control" name="berryGrapesPart3"></td>
    <td><input type="text" class="cell form-control" name="mixPart1"></td>
    <td><input type="text" class="cell form-control" name="mixPart2"></td>
    <td><input type="text" class="cell form-control" name="mixPart3"></td>
    <td><input type="text" class="cell form-control" name="palmPart1"></td>
    <td><input type="text" class="cell form-control" name="palmPart2"></td>
    <td><input type="text" class="cell form-control" name="palmPart3"></td>
    <td><input type="text" class="cell form-control" name="premiumPart1"></td>
    <td><input type="text" class="cell form-control" name="premiumPart2"></td>
    <td><input type="text" class="cell form-control" name="premiumPart3"></td>
    <td colspan="3"><label class="form-control" name="date">${formattedDate}</label></td>
    <td class="action-buttons" colspan="3">
        <button class="btn btn-save btn-sm" onclick="saveRow(this)">Save</button>
        <button class="btn btn-danger btn-sm" onclick="deleteRow(this)">Delete</button>
    </td >
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
        const output = newRow.querySelector(`input[name="${prefix}3"]`);

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
    
    const dataAdd = {
        idPart1: inputs[0].value,
        idPart2: inputs[1].value,
        idPart3: inputs[2].value,
        sadaPart1: inputs[3].value,
        sadaPart2: inputs[4].value,
        sadaPart3: inputs[5].value,
        boteekhPart1: inputs[6].value,
        boteekhPart2: inputs[7].value,
        boteekhPart3: inputs[8].value,
        alikaPart1: inputs[9].value,
        alikaPart2: inputs[10].value,
        alikaPart3: inputs[11].value,
        blueberryPart1: inputs[12].value,
        blueberryPart2: inputs[13].value,
        blueberryPart3: inputs[14].value,
        mintGrapesPart1: inputs[15].value,
        mintGrapesPart2: inputs[16].value,
        mintGrapesPart3: inputs[17].value,
        mintLemonPart1: inputs[18].value,
        mintLemonPart2: inputs[19].value,
        mintLemonPart3: inputs[20].value,
        berryGrapesPart1: inputs[21].value,
        berryGrapesPart2: inputs[22].value,
        berryGrapesPart3: inputs[23].value,
        mixPart1: inputs[24].value,
        mixPart2: inputs[25].value,
        mixPart3: inputs[26].value,
        palmPart1: inputs[27].value,
        palmPart2: inputs[28].value,
        palmPart3: inputs[29].value,
        premiumPart1: inputs[30].value,
        premiumPart2: inputs[31].value,
        premiumPart3: inputs[32].value,
        date: formattedDate,
        now: Date()
    };

    const dataEdit = {
        idPart1: inputs[0].value,
        idPart2: inputs[1].value,
        idPart3: inputs[2].value,
        sadaPart1: inputs[3].value,
        sadaPart2: inputs[4].value,
        sadaPart3: inputs[5].value,
        boteekhPart1: inputs[6].value,
        boteekhPart2: inputs[7].value,
        boteekhPart3: inputs[8].value,
        alikaPart1: inputs[9].value,
        alikaPart2: inputs[10].value,
        alikaPart3: inputs[11].value,
        blueberryPart1: inputs[12].value,
        blueberryPart2: inputs[13].value,
        blueberryPart3: inputs[14].value,
        mintGrapesPart1: inputs[15].value,
        mintGrapesPart2: inputs[16].value,
        mintGrapesPart3: inputs[17].value,
        mintLemonPart1: inputs[18].value,
        mintLemonPart2: inputs[19].value,
        mintLemonPart3: inputs[20].value,
        berryGrapesPart1: inputs[21].value,
        berryGrapesPart2: inputs[22].value,
        berryGrapesPart3: inputs[23].value,
        mixPart1: inputs[24].value,
        mixPart2: inputs[25].value,
        mixPart3: inputs[26].value,
        palmPart1: inputs[27].value,
        palmPart2: inputs[28].value,
        palmPart3: inputs[29].value,
        premiumPart1: inputs[30].value,
        premiumPart2: inputs[31].value,
        premiumPart3: inputs[32].value,
        date: formattedDate
    };

    

    try {
        if (docId) {
            await updateDoc(doc(db, 'rows', docId), dataEdit);
            showAlert('Row Updated', 'success');
        } else {
            await addDoc(collection(db, 'rows'), dataAdd);
            showAlert('Row Added', 'success');
        }
    } catch (e) {
        showAlert(e, 'danger');
    }
};

window.deleteRow = async function (button) {
    const row = button.closest('tr');
    const tableBody = document.getElementById('table-body');
    tableBody.removeChild(row);

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

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const newRow = document.createElement('tr');
            newRow.setAttribute('data-id', doc.id);

        
            newRow.innerHTML = `
            <td><input type="text" class="cell form-control" name="idPart1" value="${data.idPart1 || ''}"></td>
            <td><input type="text" class="cell form-control" name="idPart2" value="${data.idPart2 || ''}"></td>
            <td><input type="text" class="cell form-control" name="idPart3" value="${data.idPart3 || ''}"></td>
            <td><input type="text" class="cell form-control" name="sadaPart1" value="${data.sadaPart1 || ''}"></td>
            <td><input type="text" class="cell form-control" name="sadaPart2" value="${data.sadaPart2 || ''}"></td>
            <td><input type="text" class="cell form-control" name="sadaPart3" value="${data.sadaPart3 || ''}"></td>
            <td><input type="text" class="cell form-control" name="boteekhPart1" value="${data.boteekhPart1 || ''}"></td>
            <td><input type="text" class="cell form-control" name="boteekhPart2" value="${data.boteekhPart2 || ''}"></td>
            <td><input type="text" class="cell form-control" name="boteekhPart3" value="${data.boteekhPart3 || ''}"></td>
            <td><input type="text" class="cell form-control" name="alikaPart1" value="${data.alikaPart1 || ''}"></td>
            <td><input type="text" class="cell form-control" name="alikaPart2" value="${data.alikaPart2 || ''}"></td>
            <td><input type="text" class="cell form-control" name="alikaPart3" value="${data.alikaPart3 || ''}"></td>
            <td><input type="text" class="cell form-control" name="blueberryPart1" value="${data.blueberryPart1 || ''}"></td>
            <td><input type="text" class="cell form-control" name="blueberryPart2" value="${data.blueberryPart2 || ''}"></td>
            <td><input type="text" class="cell form-control" name="blueberryPart3" value="${data.blueberryPart3 || ''}"></td>
            <td><input type="text" class="cell form-control" name="mintGrapesPart1" value="${data.mintGrapesPart1 || ''}"></td>
            <td><input type="text" class="cell form-control" name="mintGrapesPart2" value="${data.mintGrapesPart2 || ''}"></td>
            <td><input type="text" class="cell form-control" name="mintGrapesPart3" value="${data.mintGrapesPart3 || ''}"></td>
            <td><input type="text" class="cell form-control" name="mintLemonPart1" value="${data.mintLemonPart1 || ''}"></td>
            <td><input type="text" class="cell form-control" name="mintLemonPart2" value="${data.mintLemonPart2 || ''}"></td>
            <td><input type="text" class="cell form-control" name="mintLemonPart3" value="${data.mintLemonPart3 || ''}"></td>
            <td><input type="text" class="cell form-control" name="berryGrapesPart1" value="${data.berryGrapesPart1 || ''}"></td>
            <td><input type="text" class="cell form-control" name="berryGrapesPart2" value="${data.berryGrapesPart2 || ''}"></td>
            <td><input type="text" class="cell form-control" name="berryGrapesPart3" value="${data.berryGrapesPart3 || ''}"></td>
            <td><input type="text" class="cell form-control" name="mixPart1" value="${data.mixPart1 || ''}"></td>
            <td><input type="text" class="cell form-control" name="mixPart2" value="${data.mixPart2 || ''}"></td>
            <td><input type="text" class="cell form-control" name="mixPart3" value="${data.mixPart3 || ''}"></td>
            <td><input type="text" class="cell form-control" name="palmPart1" value="${data.palmPart1 || ''}"></td>
            <td><input type="text" class="cell form-control" name="palmPart2" value="${data.palmPart2 || ''}"></td>
            <td><input type="text" class="cell form-control" name="palmPart3" value="${data.palmPart3 || ''}"></td>
            <td><input type="text" class="cell form-control" name="premiumPart1" value="${data.premiumPart1 || ''}"></td>
            <td><input type="text" class="cell form-control" name="premiumPart2" value="${data.premiumPart2 || ''}"></td>
            <td><input type="text" class="cell form-control" name="premiumPart3" value="${data.premiumPart3 || ''}"></td>
            <td colspan="3"><label class="form-control" name="date">${data.date}</label></td>
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
                const output = newRow.querySelector(`input[name="${prefix}3"]`);

                if (input1 && input2 && output) {
                    input1.addEventListener('input', () => calculateAndSetFieldValues(output, input1, input2, prefix));
                    input2.addEventListener('input', () => calculateAndSetFieldValues(output, input1, input2, prefix));

                    calculateAndSetFieldValues(output, input1, input2, prefix);
                } else {
                    console.warn(`Missing input or output fields for ${prefix}`);
                }
            });
        });
    } catch (e) {
        showAlert(e, 'danger');
    }
};

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
        const lastOutputElement = lastRow.querySelector(`input[name="${prefix}3"]`);
        if (lastOutputElement) {
            lastOutputValue = parseFloat(lastOutputElement.value) || 0;
        }
    }
    output.value = lastOutputValue + (value1 - value2);
}