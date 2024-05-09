const forms = document.querySelectorAll('.service-form');

forms.forEach(form => {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const serviceData = {};
        formData.forEach((value, key) => {
            serviceData[key] = value;
        });

        const isUpdate = event.submitter.classList.contains('update');
        const isDelete = event.submitter.classList.contains('delete');

        try {
            let response;
            if (isUpdate || isDelete) {
                const serviceId = form.getAttribute('id');
                const requestOptions = {
                    method: isUpdate ? 'PUT' : 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache'
                    }
                };
                if (isUpdate) {
                    requestOptions.body = JSON.stringify(serviceData);
                }
                response = await fetch(`../api/services/${serviceId}`, requestOptions);
            } else {
                response = await fetch('../api/services', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache'
                    },
                    body: JSON.stringify(serviceData)
                });
            }

            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            location.reload();
        } catch (error) {
            console.error('Erreur:', error.message);

        }
    });
});
