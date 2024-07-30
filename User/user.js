import { collection, db, getDocs, query, orderBy } from '../DB/db.js';

async function loadData() {
    try {
        const tableBody = document.getElementById('table-body');
        const querySnapshot = await getDocs(query(collection(db, 'rows'), orderBy('now')));

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const newRow = document.createElement('tr');
            newRow.setAttribute('data-id', doc.id);

            newRow.innerHTML = `
            <td><label class="cell form-control">${data.idPart1 || ''}</label></td>
            <td><label class="cell form-control">${data.idPart2 || ''}</label></td>
            <td><label class="cell form-control">${data.idPart3 || ''}</label></td>
            <td><label class="cell form-control">${data.sadaPart1 || ''}</label></td>
            <td><label class="cell form-control">${data.sadaPart2 || ''}</label></td>
            <td><label class="cell form-control">${data.sadaPart3 || ''}</label></td>
            <td><label class="cell form-control">${data.boteekhPart1 || ''}</label></td>
            <td><label class="cell form-control">${data.boteekhPart2 || ''}</label></td>
            <td><label class="cell form-control">${data.boteekhPart3 || ''}</label></td>
            <td><label class="cell form-control">${data.alikaPart1 || ''}</label></td>
            <td><label class="cell form-control">${data.alikaPart2 || ''}</label></td>
            <td><label class="cell form-control">${data.alikaPart3 || ''}</label></td>
            <td><label class="cell form-control">${data.blueberryPart1 || ''}</label></td>
            <td><label class="cell form-control">${data.blueberryPart2 || ''}</label></td>
            <td><label class="cell form-control">${data.blueberryPart3 || ''}</label></td>
            <td><label class="cell form-control">${data.mintGrapesPart1 || ''}</label></td>
            <td><label class="cell form-control">${data.mintGrapesPart2 || ''}</label></td>
            <td><label class="cell form-control">${data.mintGrapesPart3 || ''}</label></td>
            <td><label class="cell form-control">${data.mintLemonPart1 || ''}</label></td>
            <td><label class="cell form-control">${data.mintLemonPart2 || ''}</label></td>
            <td><label class="cell form-control">${data.mintLemonPart3 || ''}</label></td>
            <td><label class="cell form-control">${data.berryGrapesPart1 || ''}</label></td>
            <td><label class="cell form-control">${data.berryGrapesPart2 || ''}</label></td>
            <td><label class="cell form-control">${data.berryGrapesPart3 || ''}</label></td>
            <td><label class="cell form-control">${data.mixPart1 || ''}</label></td>
            <td><label class="cell form-control">${data.mixPart2 || ''}</label></td>
            <td><label class="cell form-control">${data.mixPart3 || ''}</label></td>
            <td><label class="cell form-control">${data.palmPart1 || ''}</label></td>
            <td><label class="cell form-control">${data.palmPart2 || ''}</label></td>
            <td><label class="cell form-control">${data.palmPart3 || ''}</label></td>
            <td><label class="cell form-control">${data.premiumPart1 || ''}</label></td>
            <td><label class="cell form-control">${data.premiumPart2 || ''}</label></td>
            <td><label class="cell form-control">${data.premiumPart3 || ''}</label></td>
            <td colspan="3"><label class="form-control">${data.date}</label></td>
        `;
            tableBody.appendChild(newRow);
        });
    } catch (e) {
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
