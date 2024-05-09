schedulesForm = document.getElementById('schedules-form');
schedulesContainer = document.getElementById('schedules-container');

schedulesForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const weekday = document.getElementById('weekday').value;
    const morningopeningtime = document.getElementById('morningopeningtime').value;
    const morningclosingtime = document.getElementById('morningclosingtime').value;
    const afternoonopeningtime = document.getElementById('afternoonopeningtime').value;
    const afternoonclosingtime = document.getElementById('afternoonclosingtime').value;

    addOrUpdateSchedule({weekday, morningopeningtime, morningclosingtime, afternoonopeningtime, afternoonclosingtime});
});

addOrUpdateSchedule = (schedule) => {
    console.log('schedule', schedule);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(schedule)
    };
    const schedulesUrl = 'api/schedules';

    fetch(schedulesUrl, requestOptions)
        .then(response => {
            getSchedules();
        })
        .catch(error => {
            console.error('Erreur lors de la requête :', error);
        })
}

getSchedules = () => {
    fetch('api/schedules', { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Request failed');
            }
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                throw new Error('Non JSON content type received');
            }
        })
        .then(data => {
            showSchedules(data);
        })
        .catch(error => console.error('Erreur lors de la requête :', error));
}


// Mettre à jour les horaires et les valeurs des inputs
showSchedules = (schedules) => {
    schedulesContainer.innerHTML = '';
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    const tableHeader = table.createTHead();
    const headerRow = tableHeader.insertRow();
    headerRow.innerHTML = '<th scope="col">Jour</th><th  scope="col">Ouverture matin</th><th  scope="col">Fermeture matin</th><th  scope="col">Ouverture après-midi</th><th  scope="col">Fermeture après-midi</th>';

    const tableBody = document.createElement('tbody');
    schedules.forEach(item => {
        const row = tableBody.insertRow();
        row.innerHTML = `<th scope="row">${item.weekday}</th><td>${item.morningopeningtime}</td><td>${item.morningclosingtime}</td><td>${item.afternoonopeningtime}</td><td>${item.afternoonclosingtime}</td>`;

        // Mettre à jour les valeurs des inputs
        if (item.weekday === document.getElementById('weekday').value) {
            document.getElementById('morningopeningtime').value = item.morningopeningtime;
            document.getElementById('morningclosingtime').value = item.morningclosingtime;
            document.getElementById('afternoonopeningtime').value = item.afternoonopeningtime;
            document.getElementById('afternoonclosingtime').value = item.afternoonclosingtime;
        }
    });

    table.appendChild(tableBody);
    schedulesContainer.appendChild(table);
}

// Mettre à jour les horaires lors du chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    getSchedules();
});

// Mettre à jour les horaires lors du changement de jour de la semaine
document.getElementById('weekday').addEventListener('change', () => {
    getSchedules();
});