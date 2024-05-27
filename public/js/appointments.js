

//charger au chargement de la page
window.onload = function() {
    document.getElementById('day').addEventListener('change', function() {
        const selectedDate = this.value; // Récupérer la date sélectionnée
        const timeSelect = document.getElementById('time');
        timeSelect.innerHTML = ''; // Effacer les anciennes options

        // Boucler à travers les créneaux disponibles
        for (let i = 0; i < availableSlots.length; i++) {
            const slot = availableSlots[i];
            const date = slot.split(' ')[0];
            const time = slot.split(' ')[1];

            // Vérifier si le créneau correspond à la date sélectionnée
            if (date === selectedDate) {
                const option = document.createElement('option');
                option.text = time;
                option.value = time;
                timeSelect.appendChild(option); // Ajouter l'option au menu déroulant
            }
        }
    });

    //trigger le changement de date au chargement de la page
    document.getElementById('day').dispatchEvent(new Event('change'));

    //Enregister le rendez-vous
    document.getElementById('appointment-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedDate = document.getElementById('day').value;
        const selectedTime = document.getElementById('time').value;
        const dateTime = `${selectedDate} ${selectedTime}`;
        //saveAppointment(selectedDate, selectedTime, name, email, phone, service, message);
    });

}