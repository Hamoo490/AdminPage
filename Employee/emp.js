import { collection, db, getDocs, updateDoc, doc, query, orderBy, where } from '../DB/db.js';

function getCurrentDateFormatted() {
    const now = new Date();
    const day = String(now.getDate());
    const month = String(now.getMonth() + 1);
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
}

async function loadData() {
    try {
        const currentDate = getCurrentDateFormatted();
        const tableBody = document.getElementById('table-body');
        const querySnapshot = await getDocs(query(collection(db, 'rows'), orderBy('now')));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const newRow = document.createElement('tr');
            newRow.setAttribute('data-id', doc.id);
            if (doc.data()['date'] === currentDate) {
                newRow.innerHTML = `
                <td><input type="text" class="cell form-control" value="${data.idPart1 || ''}"></td>
                <td><label class="cell form-control"></label></td>
                <td><label class="cell form-control"></label></td>
                <td><input type="text" class="cell form-control" value="${data.sadaPart1 || ''}"></td>
                <td><label class="cell form-control"></label></td>
                <td><label class="cell form-control"></label></td>
                <td><input type="text" class="cell form-control" value="${data.boteekhPart1 || ''}"></td>
                <td><label class="cell form-control"></label></td>
                <td><label class="cell form-control"></label></td>
                <td><input type="text" class="cell form-control" value="${data.alikaPart1 || ''}"></td>
                <td><label class="cell form-control"></label></td>
                <td><label class="cell form-control"></label></td>
                <td><input type="text" class="cell form-control" value="${data.blueberryPart1 || ''}"></td>
                <td><label class="cell form-control"></label></td>
                <td><label class="cell form-control"></label></td>
                <td><input type="text" class="cell form-control" value="${data.mintGrapesPart1 || ''}"></td>
                <td><label class="cell form-control"></label></td>
                <td><label class="cell form-control"></label></td>
                <td><input type="text" class="cell form-control" value="${data.mintLemonPart1 || ''}"></td>
                <td><label class="cell form-control"></label></td>
                <td><label class="cell form-control"></label></td>
                <td><input type="text" class="cell form-control" value="${data.berryGrapesPart1 || ''}"></td>
                <td><label class="cell form-control"></label></td>
                <td><label class="cell form-control"></label></td>
                <td><input type="text" class="cell form-control" value="${data.mixPart1 || ''}"></td>
                <td><label class="cell form-control"></label></td>
                <td><label class="cell form-control"></label></td>
                <td><input type="text" class="cell form-control" value="${data.palmPart1 || ''}"></td>
                <td><label class="cell form-control"></label></td>
                <td><label class="cell form-control"></label></td>
                <td><input type="text" class="cell form-control" value="${data.premiumPart1 || ''}"></td>
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

loadData();

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
        idPart1: inputs[0].value,
        sadaPart1: inputs[1].value,
        boteekhPart1: inputs[2].value,
        alikaPart1: inputs[3].value,
        blueberryPart1: inputs[4].value,
        mintGrapesPart1: inputs[5].value,
        mintLemonPart1: inputs[6].value,
        berryGrapesPart1: inputs[7].value,
        mixPart1: inputs[8].value,
        palmPart1: inputs[9].value,
        premiumPart1: inputs[10].value
    };

    try {
        await updateDoc(doc(db, 'rows', docId), data);
        showAlert('Row Updated', 'success');
    } catch (e) {
        showAlert(e, 'danger');
    }
};