const uploadForm = document.getElementById('upload-form');
const deleteForms = document.querySelectorAll('.photo-form');

uploadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(uploadForm);
    fetch('../api/upload/office', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        location.reload();
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
})

deleteForms.forEach(form => {
    form.addEventListener('submit',  (event) => {
        event.preventDefault();
        const id = form.getAttribute('id');
        fetch(`../api/upload/office/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression.');
            }
            location.reload();
        })
        .catch(error => {
            console.error('Erreur:', error);
            // Ajoutez ici les actions à effectuer en cas d'échec de suppression.
        });
    });
});
