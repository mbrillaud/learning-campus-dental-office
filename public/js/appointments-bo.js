// appointments-bo.js

function formatAppointmentDate(date) {
    const appointmentDate = new Date(date);
    const formattedDate = appointmentDate.toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const formattedTime = appointmentDate.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    return formattedDate + ', ' + formattedTime;
}

function formatDateForInput(date) {
    const appointmentDate = new Date(date);
    const year = appointmentDate.getFullYear();
    const month = String(appointmentDate.getMonth() + 1).padStart(2, '0');
    const day = String(appointmentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

document.querySelectorAll('.appointment-date').forEach(function(element) {
    const date = element.getAttribute('data-date');
    element.innerText = formatAppointmentDate(date);
});

function updateStatus(appointmentId) {
    const selectElement = document.getElementById(`statusSelect_${appointmentId}`);
    const newStatus = selectElement.value;

    fetch(`/api/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error updating status:', data.error);
            alert('Error updating status');
        } else {
            showToast('Le status du rendez-vous a été mis à jour', 'success');
            // Update the data-status attribute of the appointment element
            const appointmentElement = document.querySelector(`.list-group-item[data-id="${appointmentId}"]`);
            appointmentElement.setAttribute('data-status', newStatus);
            // Re-apply the filters to reflect the change
            filterAppointments();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Logique de filtrage
document.getElementById('searchName').addEventListener('input', filterAppointments);
document.getElementById('searchDate').addEventListener('input', filterAppointments);
document.getElementById('searchStatus').addEventListener('change', filterAppointments);

function filterAppointments() {
    const searchName = document.getElementById('searchName').value.toLowerCase();
    const searchDate = document.getElementById('searchDate').value;
    const searchStatus = document.getElementById('searchStatus').value;

    document.querySelectorAll('#appointmentList .list-group-item').forEach(function(item) {
        const name = item.getAttribute('data-name').toLowerCase();
        const date = formatDateForInput(item.getAttribute('data-date'));
        const status = item.getAttribute('data-status');

        const matchesName = name.includes(searchName);
        const matchesDate = !searchDate || date === searchDate;
        const matchesStatus = !searchStatus || status === searchStatus;

        if (matchesName && matchesDate && matchesStatus) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}
